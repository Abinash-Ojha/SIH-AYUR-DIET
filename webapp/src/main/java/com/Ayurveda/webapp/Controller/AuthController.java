package com.Ayurveda.webapp.Controller;

import com.Ayurveda.webapp.DTO.AuthResponse;
import com.Ayurveda.webapp.DTO.ChangePasswordDto;
import com.Ayurveda.webapp.DTO.DoctorAuthResponse;
import com.Ayurveda.webapp.DTO.DoctorLoginDto;
import com.Ayurveda.webapp.Repository.DoctorRepository;
import com.Ayurveda.webapp.model.Doctor;
import com.Ayurveda.webapp.JWT.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/doctor")
public class AuthController {

    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(DoctorRepository doctorRepository,
                          PasswordEncoder passwordEncoder,
                          AuthenticationManager authenticationManager,
                          JwtService jwtService) {
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DoctorLoginDto dto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
            );

            Doctor doctor = doctorRepository.findByEmail(dto.getEmail())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            String token = jwtService.generateTokenWithRole(dto.getEmail(), "DOCTOR");

            DoctorAuthResponse resp = new DoctorAuthResponse(
                    token,
                    "DOCTOR",
                    doctor.getId(),
                    doctor.getName(),
                    doctor.getEmail(),
                    doctor.getSpecialization()
            );

            return ResponseEntity.ok(resp);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }

    // ---------------- CHANGE PASSWORD ----------------
    @PutMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDto dto,
                                                 @RequestHeader("Authorization") String token) {
        try {
            // Extract email from JWT token
            String jwt = token.replace("Bearer ", "");
            String email = jwtService.extractUsername(jwt);

            // Find doctor
            Doctor doctor = doctorRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            // Verify old password
            if (!passwordEncoder.matches(dto.getOldPassword(), doctor.getPassword())) {
                return ResponseEntity.badRequest().body("Old password is incorrect!");
            }

            // Set new password
            doctor.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            doctorRepository.save(doctor);

            return ResponseEntity.ok("Password changed successfully!");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to change password: " + e.getMessage());
        }
    }
}
