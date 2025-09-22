package com.Ayurveda.webapp.Controller;

import com.Ayurveda.webapp.DTO.AdminAuthResponse;
import com.Ayurveda.webapp.Repository.AdminRepository;
import com.Ayurveda.webapp.model.Admin;
import com.Ayurveda.webapp.JWT.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin/auth")
public class AdminAuthController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AdminAuthController(AdminRepository adminRepository,
                               PasswordEncoder passwordEncoder,
                               AuthenticationManager authenticationManager,
                               JwtService jwtService) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    // ---------------- Register Admin ----------------
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Admin admin) {
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Admin with this email already exists!");
        }

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered successfully!");
    }

    // ---------------- Login Admin ----------------
    // Login Admin
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(admin.getEmail(), admin.getPassword())
            );

            Optional<Admin> foundAdmin = adminRepository.findByEmail(admin.getEmail());
            if (foundAdmin.isEmpty()) {
                return ResponseEntity.status(401).body("Invalid credentials!");
            }

            String token = jwtService.generateTokenWithRole(admin.getEmail(), "ADMIN");

            AdminAuthResponse resp = new AdminAuthResponse(token, "ADMIN", foundAdmin.get().getEmail());
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }

}
