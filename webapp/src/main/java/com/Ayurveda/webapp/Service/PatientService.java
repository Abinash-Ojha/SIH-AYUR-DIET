package com.Ayurveda.webapp.Service;
import com.Ayurveda.webapp.Repository.PatientRepository;
import com.Ayurveda.webapp.model.Patient;
import com.Ayurveda.webapp.model.Doctor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Create a new patient
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Get all patients for a doctor
    public List<Patient> getPatientsByDoctor(Doctor doctor) {
        return patientRepository.findByDoctor(doctor);
    }

    // Get a single patient by ID
    public Optional<Patient> getPatientById(Long patientId) {
        return patientRepository.findById(patientId);
    }

    // Update a patient
    public Patient updatePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Delete a patient
    public void deletePatient(Long patientId) {
        patientRepository.deleteById(patientId);
    }
}

