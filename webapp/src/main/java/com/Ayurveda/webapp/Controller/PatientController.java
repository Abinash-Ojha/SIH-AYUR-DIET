package com.Ayurveda.webapp.Controller;
import com.Ayurveda.webapp.DTO.PatientDetailsForDoctorDTO;
import com.Ayurveda.webapp.DTO.PatientMLRequestDTO;
import com.Ayurveda.webapp.DTO.DoctorResponseDTO;
import com.Ayurveda.webapp.Repository.PatientRepository;
import com.Ayurveda.webapp.Service.PatientService;
import com.Ayurveda.webapp.Repository.PatientAuthRepository;
import com.Ayurveda.webapp.Repository.DoctorRepository;
import com.Ayurveda.webapp.model.Patient;
import com.Ayurveda.webapp.model.Doctor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth/patients")
public class PatientController {

    private final PatientService patientService;
    private final DoctorRepository doctorRepository;
    private final PatientAuthRepository patientAuthRepository;
    private final PatientRepository patientRepository;

    public PatientController(PatientService patientService,
                             DoctorRepository doctorRepository,
                             PatientAuthRepository patientAuthRepository,PatientRepository patientRepository) {
        this.patientService = patientService;
        this.doctorRepository = doctorRepository;
        this.patientAuthRepository = patientAuthRepository;
        this.patientRepository=patientRepository;
    }

    // ============================
    // Create Patient
    // ============================
    @PostMapping("/register")
    public ResponseEntity<?> createPatient(@RequestBody Patient patient, Principal principal) {
        try {
            Doctor doctor = doctorRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            patient.setDoctor(doctor);


            Patient savedPatient = patientService.createPatient(patient);
            return ResponseEntity.ok(toMLDTO(savedPatient));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ============================
    // Get All Patients of Logged-in Doctor
    // ============================
    @GetMapping("/allPatients")
    public ResponseEntity<?> getPatients(Principal principal) {
        try {
            Doctor doctor = doctorRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            // Get the list of patients directly
            List<Patient> patients = patientService.getPatientsByDoctor(doctor);

            return ResponseEntity.ok(patients);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ============================
    // Get Patient by ID
    // ============================
    @GetMapping("/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable Long id, Principal principal) {
        try {
            Doctor doctor = doctorRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            Patient patient = patientService.getPatientById(id)
                    .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + id));

            if (!patient.getDoctor().getId().equals(doctor.getId())) {
                return ResponseEntity.status(403).body(Map.of("error", "Forbidden: You do not have access to this patient."));
            }

            return ResponseEntity.ok(patient);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ============================
    // Update Patient
    // ============================
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePatient(@PathVariable Long id,
                                           @RequestBody Patient updatedPatient,
                                           Principal principal) {
        try {
            Doctor doctor = doctorRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            Patient existingPatient = patientService.getPatientById(id)
                    .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + id));

            if (!existingPatient.getDoctor().getId().equals(doctor.getId())) {
                return ResponseEntity.status(403).body(Map.of("error", "Forbidden: You do not have access to update this patient."));
            }

            updatedPatient.setId(id);
            updatedPatient.setDoctor(doctor);
            Patient savedPatient = patientService.updatePatient(updatedPatient);

            return ResponseEntity.ok(toMLDTO(savedPatient));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ============================
    // Delete Patient
    // ============================
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id, Principal principal) {
        try {
            Doctor doctor = doctorRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            Patient patient = patientService.getPatientById(id)
                    .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + id));

            if (!patient.getDoctor().getId().equals(doctor.getId())) {
                return ResponseEntity.status(403).body(Map.of("error", "Forbidden: You do not have access to delete this patient."));
            }

            patientService.deletePatient(id);
            return ResponseEntity.ok(Map.of("message", "Patient deleted successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ============================
    // Get Patient by Aadhar
    // ============================
    @GetMapping("/details/{aadhar}")
    public ResponseEntity<?> getPatientDetailsByAadhar(@PathVariable String aadhar) {
        return patientAuthRepository.findByAadharNumber(aadhar)
                .<ResponseEntity<?>>map(auth -> ResponseEntity.ok(
                        new PatientDetailsForDoctorDTO(auth.getFullName(), auth.getEmail(), auth.getAadharNumber())))
                .orElse(ResponseEntity.status(404).body(Map.of("error", "Patient not found with Aadhar: " + aadhar)));
    }

    // ============================
    // Helper Methods
    // ============================
    private DoctorResponseDTO toDoctorDTO(Doctor doctor) {
        return new DoctorResponseDTO(
                doctor.getId(),
                doctor.getName(),
                doctor.getEmail(),
                doctor.getSpecialization()
        );
    }

    // FTO: PatientRequestDTO (matches Postman JSON)

    // Mapper method: converts Patient entity to PatientResponseDTO
    public PatientMLRequestDTO toMLDTO(Patient patient) {
        PatientMLRequestDTO dto = new PatientMLRequestDTO();

        dto.setPatient_id("PAT_" + patient.getId()); // or any unique string
        dto.setAge(patient.getAge());
        dto.setGender(patient.getGender());
        dto.setHeight(patient.getHeight());
        dto.setWeight(patient.getWeight());
        dto.setActivity_level(patient.getActivityLevel());
        dto.setGoals(patient.getGoalType());
        dto.setCountry(patient.getCountry());
        dto.setState(patient.getState());
        dto.setCity(patient.getCity());
        dto.setClimate(patient.getClimate());
        dto.setDiet_type(patient.getDietType());

        dto.setCuisine_preferences(
                patient.getCuisinePreference() != null ?
                        Arrays.asList(patient.getCuisinePreference().split(",")) :
                        List.of()
        );

        dto.setFavorite_foods(
                patient.getFavoriteFoods() != null ?
                        Arrays.asList(patient.getFavoriteFoods().split(",")) :
                        List.of()
        );

        dto.setDisliked_foods(
                patient.getDislikedFoods() != null ?
                        Arrays.asList(patient.getDislikedFoods().split(",")) :
                        List.of()
        );

        dto.setAllergies(
                patient.getAllergies() != null ?
                        Arrays.asList(patient.getAllergies().split(",")) :
                        List.of()
        );

        dto.setFood_intolerances(
                patient.getFoodIntolerances() != null ?
                        Arrays.asList(patient.getFoodIntolerances().split(",")) :
                        List.of()
        );

        dto.setMedical_conditions(
                patient.getMedicalConditions() != null ?
                        Arrays.asList(patient.getMedicalConditions().split(",")) :
                        List.of()
        );

        dto.setAgni(patient.getAgni());
        dto.setDigestion(patient.getDigestion());
        dto.setAppetite(patient.getAppetite());
        dto.setBowel_movements(patient.getBowelMovements());
        dto.setSleep_quality(patient.getSleepQuality());
        dto.setEnergy_levels(patient.getEnergyLevels());
        dto.setEmotional_tendencies(patient.getEmotionalTendencies());
        dto.setStress_levels(patient.getStressLevel());
        dto.setMental_workload(patient.getMentalWorkload());
        dto.setBody_frame(patient.getBodyFrame());
        dto.setMuscle_tone(patient.getMuscleTone());
        dto.setSkin_type(patient.getSkinType());
        dto.setHair_type(patient.getHairType());
        dto.setVoice_quality(patient.getVoiceQuality());
        dto.setTemperature_preference(patient.getTemperaturePreference());
        dto.setSweat_pattern(patient.getSweatPattern());
        dto.setWater_intake(patient.getWaterIntake() != null ? patient.getWaterIntake() : 0.0);
        dto.setOccupation(patient.getOccupation());
        dto.setWorkout_type(patient.getWorkoutType());
        dto.setWorkout_intensity(patient.getWorkoutIntensity());
        dto.setWorkout_frequency(patient.getWorkoutFrequency());
        dto.setSmoking(patient.getSmoking());
        dto.setAlcohol(patient.getAlcohol());
        dto.setCaffeine_intake(patient.getCaffeineIntake());
        dto.setSeason(patient.getSeason());
        dto.setConsultation_date(patient.getConsultationDate());

        return dto;
    }

}
