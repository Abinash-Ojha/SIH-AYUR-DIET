package com.Ayurveda.webapp.Repository;

import com.Ayurveda.webapp.model.DietResponse;
import com.Ayurveda.webapp.model.Doctor;
import com.Ayurveda.webapp.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ResponseRepository extends JpaRepository<DietResponse,Long> {
    // Fetch all responses for a doctor + fetch doctor & patient eagerly
    // All responses for a given doctor
    List<DietResponse> findByDoctorOrderByCreatedAtDesc(Doctor doctor);

    // Responses for a given doctor & patient
    List<DietResponse> findByDoctorAndPatientIdOrderByCreatedAtDesc(Doctor doctor, Long patientId);
    Optional<DietResponse> findFirstByPatientIdOrderByCreatedAtDesc(Long patientId);


    Optional<DietResponse> findByAccessToken(String accessToken);
    Optional<DietResponse> findByPatientId(Long id);
}
