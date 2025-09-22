package com.Ayurveda.webapp.Controller;

import com.Ayurveda.webapp.DTO.*;
import com.Ayurveda.webapp.Repository.DoctorRepository;
import com.Ayurveda.webapp.Repository.PatientRepository;
import com.Ayurveda.webapp.Repository.ResponseRepository;
import com.Ayurveda.webapp.Service.EmailService;
import com.Ayurveda.webapp.Service.GeminiService;
import com.Ayurveda.webapp.model.DietResponse;
import com.Ayurveda.webapp.model.Doctor;
import com.Ayurveda.webapp.model.Patient;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ResponseRepository responseRepository;
    private final GeminiService geminiService;
    private final EmailService emailService;
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    public ResponseController(PatientRepository patientRepository,
                              DoctorRepository doctorRepository,
                              ResponseRepository responseRepository,
                              GeminiService geminiService,
                              EmailService emailService) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.responseRepository = responseRepository;
        this.geminiService = geminiService;
        this.emailService = emailService;
    }

    // ============================
    // 🔹 Fetch Reports
    // ============================

    @GetMapping("/my-reports")
    public ResponseEntity<?> getMyReports(Principal principal) {
        try {
            Doctor doctor = doctorRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            List<DietResponse> responses = responseRepository.findByDoctorOrderByCreatedAtDesc(doctor);

            List<DietResponseDTO> result = responses.stream().map(resp -> {
                DietResponseDTO dto = new DietResponseDTO(
                        resp.getId(),
                        resp.getAnalysis(),  // ✅ always analysis first
                        resp.getPlan(),      // ✅ then plan
                        resp.getCreatedAt(),
                        toDoctorDTO(resp.getDoctor()),
                        toMLDTO(resp.getPatient())
                );
                dto.setDoctorsRemark(resp.getDoctorsRemark());
                return dto;
            }).toList();

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while fetching reports: " + e.getMessage());
        }
    }


    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?> getPatientReports(@PathVariable Long patientId, Principal principal) {
        try {
            Doctor doctor = doctorRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            List<DietResponse> responses = responseRepository
                    .findByDoctorAndPatientIdOrderByCreatedAtDesc(doctor, patientId);

            if (responses.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No reports found for this patient under your account.");
            }

            List<DietResponseDTO> result = responses.stream().map(resp -> {
                DietResponseDTO dto = new DietResponseDTO(
                        resp.getId(),
                        resp.getAnalysis(),   // ✅ always analysis first
                        resp.getPlan(),       // ✅ then plan
                        resp.getCreatedAt(),
                        toDoctorDTO(resp.getDoctor()),
                        toMLDTO(resp.getPatient())
                );
                dto.setDoctorsRemark(resp.getDoctorsRemark());
                return dto;
            }).toList();

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while fetching patient reports: " + e.getMessage());
        }
    }

    @GetMapping("getPlan/token/{token}")
    public ResponseEntity<?> getResponseByToken(@PathVariable("token") String token) {
        System.out.println(token);
        try {

            DietResponse response = responseRepository.findByAccessToken(token)
                    .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("dietResponseId", response.getId());
            result.put("accessToken", response.getAccessToken());
            result.put("createdAt", response.getCreatedAt());
            result.put("doctorsRemark", response.getDoctorsRemark());

            // Doctor info (if present)
            if (response.getDoctor() != null) {
                Map<String, Object> doctor = new LinkedHashMap<>();
                doctor.put("id", response.getDoctor().getId());
                doctor.put("name", response.getDoctor().getName());
                doctor.put("email", response.getDoctor().getEmail());
                doctor.put("specialization", response.getDoctor().getSpecialization());
                result.put("doctor", doctor);
            } else {
                result.put("doctor", null);
            }

            // Patient info (if present)
            if (response.getPatient() != null) {
                Map<String, Object> patient = new LinkedHashMap<>();
                patient.put("id", response.getPatient().getId());
                patient.put("fullName", response.getPatient().getFullName());
                patient.put("email", response.getPatient().getEmail());
                result.put("patient", patient);
            } else {
                result.put("patient", null);
            }

            // Parse analysis JSON (if available) into Map, otherwise return raw string

            if (response.getAnalysis() != null) {
                try {
                    Object analysisObj = objectMapper.readValue(response.getAnalysis(), Map.class);
                    result.put("analysis", analysisObj);
                } catch (Exception ex) {
                    result.put("analysis", response.getAnalysis());
                }
            } else {
                result.put("analysis", null);
            }

            // Parse plan JSON (if available) into Map, otherwise return raw string
            if (response.getPlan() != null) {
                try {
                    Object planObj = objectMapper.readValue(response.getPlan(), Map.class);
                    result.put("plan", planObj);
                } catch (Exception ex) {
                    result.put("plan", response.getPlan());
                }
            } else {
                result.put("plan", null);
            }

            return ResponseEntity.ok(result);

        } catch (RuntimeException rex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", rex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", ex.getMessage()));
        }
    }



    // ============================
    // 🔹 Analyze (Step 1)
    // ============================

    @PostMapping("/analyze/{patientId}")
    public ResponseEntity<?> analyzeAndSave(@PathVariable Long patientId, Principal principal) {
        try {
            // ✅ Fetch patient
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            // ✅ Fetch doctor
            Doctor doctor = doctorRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            // ✅ Check if a response already exists for this patient
            Optional<DietResponse> existingResponse = responseRepository.findFirstByPatientIdOrderByCreatedAtDesc(patient.getId());
            if (existingResponse.isPresent()) {
                DietResponse resp = existingResponse.get();

                // Convert saved JSON string back to Map
                Map<String, Object> savedAnalysis = new ObjectMapper()
                        .readValue(resp.getAnalysis(), new TypeReference<Map<String, Object>>() {});

                return ResponseEntity.ok(Map.of(
                        "dietResponseId", resp.getId(),
                        "analysis", savedAnalysis,
                        "fromCache", true
                ));
            }

            // ✅ If no response exists → Call /analyze API
            PatientMLRequestDTO analyzeRequest = toMLDTO(patient);
            WebClient client = webClientBuilder.build();

            Map<String, Object> analyzeResponse = client.post()
                    .uri("https://ayurveda-aga2.onrender.com/analyze")
                    .header("x-api-key", "supersecret123")
                    .bodyValue(analyzeRequest)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .block();

            // Save as JSON text
            String analysisJson = new ObjectMapper().writeValueAsString(analyzeResponse);

            DietResponse response = new DietResponse();
            response.setDoctor(doctor);
            response.setPatient(patient);
            response.setAnalysis(analysisJson);
            response.setAccessToken(UUID.randomUUID().toString());

            responseRepository.save(response);

            return ResponseEntity.ok(Map.of(
                    "dietResponseId", response.getId(),
                    "analysis", analyzeResponse,
                    "fromCache", false
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }


    // ============================
    // 🔹 Plan (Step 2)
    // ============================

    @PostMapping("/plan/{responseId}")
    public ResponseEntity<?> generatePlan(@PathVariable("responseId") Long responseId, Principal principal) {
        try {
            // ✅ Ensure doctor exists (authenticated)
            doctorRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            // ✅ Fetch existing analysis (DietResponse)
            DietResponse existingResponse = responseRepository.findById(responseId)
                    .orElseThrow(() -> new RuntimeException("Analysis not found"));

            // ✅ If plan already exists in this response, return it
            if (existingResponse.getPlan() != null) {
                Map<String, Object> savedPlan = new ObjectMapper()
                        .readValue(existingResponse.getPlan(), new TypeReference<Map<String, Object>>() {});

                return ResponseEntity.ok(Map.of(
                        "dietResponseId", existingResponse.getId(),
                        "plan", savedPlan,
                        "fromCache", true
                ));
            }

            // ✅ Parse analysis JSON back to Map
            Map<String, Object> analysisData = new ObjectMapper()
                    .readValue(existingResponse.getAnalysis(), new TypeReference<Map<String, Object>>() {});

            // ✅ Call /plan API with saved analysis
            WebClient client = webClientBuilder.build();
            Map<String, Object> planResponse = client.post()
                    .uri("https://ayurveda-aga2.onrender.com/plan")
                    .header("x-api-key", "supersecret123")
                    .bodyValue(analysisData)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .block();

            // ✅ Save plan JSON inside same DietResponse
            String planJson = new ObjectMapper().writeValueAsString(planResponse);
            existingResponse.setPlan(planJson);

            responseRepository.save(existingResponse);

            return ResponseEntity.ok(Map.of(
                    "dietResponseId", existingResponse.getId(),
                    "plan", planResponse,
                    "fromCache", false
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("getAnalysisAndPlan/{responseId}")
    public ResponseEntity<?> getResponse(@PathVariable("responseId") Long responseId) {
        DietResponse response = responseRepository.findById(responseId)
                .orElseThrow(() -> new RuntimeException("Response not found"));

        Map<String, Object> result = new HashMap<>();
        result.put("dietResponseId", response.getId());

        // Map doctor to DTO
        if (response.getDoctor() != null) {
            DoctorResponseDTO doctorDTO = new DoctorResponseDTO(
                    response.getDoctor().getId(),
                    response.getDoctor().getName(),
                    response.getDoctor().getEmail(),
                    response.getDoctor().getSpecialization()
            );
            result.put("doctor", doctorDTO);
        }

        // Map patient to DTO
        if (response.getPatient() != null) {
            PatientDetailsForDoctorDTO patientDTO=new PatientDetailsForDoctorDTO(
                    response.getPatient().getId(),
                    response.getPatient().getFullName(),
                    response.getPatient().getEmail()
            );
            result.put("patient", patientDTO);
        }

        // analysis is stored as JSON string → parse it back to Map
        try {
            ObjectMapper mapper = new ObjectMapper();
            result.put("analysis", mapper.readValue(response.getAnalysis(), Map.class));
        } catch (Exception e) {
            result.put("analysis", response.getAnalysis()); // fallback raw string
        }

        result.put("plan", response.getPlan());
        result.put("doctorsRemark", response.getDoctorsRemark());
        result.put("createdAt", response.getCreatedAt());


        return ResponseEntity.ok(result);
    }
    @PostMapping("/send-response/{patientId}")
    public ResponseEntity<?> sendPatientResponse(@PathVariable Long patientId) {
        try {
            // 1️⃣ Fetch patient
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            // 2️⃣ Fetch latest response for that patient
            DietResponse response = responseRepository.findByPatientId(patientId)
                    .orElseThrow(() -> new RuntimeException("No response found for this patient"));

            // 3️⃣ Map doctor and patient details
            DoctorResponseDTO doctorDTO = null;
            if (response.getDoctor() != null) {
                doctorDTO = new DoctorResponseDTO(
                        response.getDoctor().getId(),
                        response.getDoctor().getName(),
                        response.getDoctor().getEmail(),
                        response.getDoctor().getSpecialization()
                );
            }

            PatientDetailsForDoctorDTO patientDTO = new PatientDetailsForDoctorDTO(
                    patient.getId(),
                    patient.getFullName(),
                    patient.getEmail()
            );

            // 4️⃣ Parse analysis & plan JSON
            ObjectMapper mapper = new ObjectMapper();
            String analysisPretty = response.getAnalysis();
            String planPretty = response.getPlan();

            try {
                Map<String, Object> analysisMap = mapper.readValue(response.getAnalysis(), Map.class);
                analysisPretty = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(analysisMap);
            } catch (Exception ignored) {}

            try {
                Map<String, Object> planMap = mapper.readValue(response.getPlan(), Map.class);
                planPretty = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(planMap);
            } catch (Exception ignored) {}

            // 5️⃣ Build email content
            String subject = "Your Personalized Ayurveda Report is Ready";
            String body = "Dear " + patient.getFullName() + ",\n\n"
                    + "Here is your personalized Ayurveda analysis and plan:\n\n"
                    + "Doctor: " + (doctorDTO != null ? doctorDTO.getName() : "N/A") + "\n"
                    + "Specialization: " + (doctorDTO != null ? doctorDTO.getSpecialization() : "N/A") + "\n\n"
                    + "📊 Analysis:\n" + analysisPretty + "\n\n"
                    + "📝 Plan:\n" + planPretty + "\n\n"
                    + "Doctor's Remark: " + (response.getDoctorsRemark() != null ? response.getDoctorsRemark() : "N/A") + "\n\n"
                    + "🔑 Access Token: " + response.getAccessToken() + "\n"
                    + "You can also view your response anytime at:\n"
                    + response.getAccessToken() + "\n\n"
                    + "Regards,\nAyurveda Team";

            // 6️⃣ Send email
            emailService.sendEmail(patient.getEmail(), subject, body);

            return ResponseEntity.ok(Map.of(
                    "message", "Response sent successfully to patient email",
                    "patient", patientDTO,
                    "doctor", doctorDTO,
                    "dietResponseId", response.getId(),
                    "accessToken", response.getAccessToken()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
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


    public static PatientMLRequestDTO toMLDTO(Patient patient) {
        PatientMLRequestDTO dto = new PatientMLRequestDTO();
        dto.setPatient_id("PAT_" + patient.getId());
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

        dto.setCuisine_preferences(patient.getCuisinePreference() != null ?
                Arrays.asList(patient.getCuisinePreference().split(",")) : List.of());

        dto.setFavorite_foods(patient.getFavoriteFoods() != null ?
                Arrays.asList(patient.getFavoriteFoods().split(",")) : List.of());

        dto.setDisliked_foods(patient.getDislikedFoods() != null ?
                Arrays.asList(patient.getDislikedFoods().split(",")) : List.of());

        dto.setAllergies(patient.getAllergies() != null ?
                Arrays.asList(patient.getAllergies().split(",")) : List.of());

        dto.setFood_intolerances(patient.getFoodIntolerances() != null ?
                Arrays.asList(patient.getFoodIntolerances().split(",")) : List.of());

        dto.setMedical_conditions(patient.getMedicalConditions() != null ?
                Arrays.asList(patient.getMedicalConditions().split(",")) : List.of());

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
