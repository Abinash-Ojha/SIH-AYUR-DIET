package com.Ayurveda.webapp.Controller;

import com.Ayurveda.webapp.DTO.AuthResponse;
import com.Ayurveda.webapp.DTO.PatientAuthResponse;
import com.Ayurveda.webapp.Repository.PatientAuthRepository;
import com.Ayurveda.webapp.model.PatientAuth;
import com.Ayurveda.webapp.JWT.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/patient")
public class PatientAuthController {

    @Autowired
    private PatientAuthRepository authRepository;

    @Autowired
    private JwtService jwtService;

    // Register Patient
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody PatientAuth patientAuth) {
        if (authRepository.findByEmail(patientAuth.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        if (authRepository.findByAadharNumber(patientAuth.getAadharNumber()).isPresent()) {
            return ResponseEntity.badRequest().body("Aadhar already registered!");
        }
        authRepository.save(patientAuth);
        return ResponseEntity.ok("Patient registered successfully!");
    }
    // Login Patient (returns JWT token + patient info)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody PatientAuth loginRequest) {
        try {
            PatientAuth patient = authRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Invalid credentials!"));

            // NOTE: currently plain-text check — better to use PasswordEncoder
            if (!patient.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.status(401).body("Invalid credentials!");
            }

            String token = jwtService.generateTokenWithRole(patient.getEmail(), "PATIENT");

            PatientAuthResponse resp = new PatientAuthResponse(
                    token,
                    "PATIENT",
                    patient.getFullName(),
                    patient.getEmail(),
                    patient.getAadharNumber()
            );

            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }

}
