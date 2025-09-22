package com.Ayurveda.webapp.Repository;
import com.Ayurveda.webapp.model.PatientAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface PatientAuthRepository extends JpaRepository<PatientAuth, Long> {
    Optional<PatientAuth> findByEmail(String email);
    Optional<PatientAuth> findByAadharNumber(String aadharNumber);
}
