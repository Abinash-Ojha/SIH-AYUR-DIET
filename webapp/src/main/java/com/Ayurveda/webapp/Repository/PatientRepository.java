package com.Ayurveda.webapp.Repository;

import com.Ayurveda.webapp.model.Doctor;
import com.Ayurveda.webapp.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient,Long> {
    List<Patient> findByDoctor(Doctor doctor);
    Optional<Patient> findByEmail (String email);
}
