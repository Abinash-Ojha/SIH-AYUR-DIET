package com.Ayurveda.webapp.Controller;

import com.Ayurveda.webapp.DTO.DoctorRegisterDto;
import com.Ayurveda.webapp.DTO.DoctorResponseDTO;
import com.Ayurveda.webapp.Repository.AdminRepository;
import com.Ayurveda.webapp.Repository.DoctorRepository;
import com.Ayurveda.webapp.Service.EmailService;
import com.Ayurveda.webapp.model.Admin;
import com.Ayurveda.webapp.model.Doctor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AdminController(AdminRepository adminRepository,
                           DoctorRepository doctorRepository,
                           PasswordEncoder passwordEncoder,
                           EmailService emailService) {
        this.adminRepository = adminRepository;
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    // Admin registration
    @PostMapping("/register")
    public String registerAdmin(@RequestBody Admin admin) {
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            return "Admin with this email already exists!";
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
        return "Admin registered successfully!";
    }

    // Admin registers new Doctor
    @PostMapping("/registerDoctor")
    public String registerDoctor(@RequestBody DoctorRegisterDto dto) {
        if (doctorRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "Doctor with this email already exists!";
        }

        Doctor doctor = new Doctor();
        doctor.setName(dto.getName());
        doctor.setEmail(dto.getEmail());

        // Keep raw password for email before encoding
        String rawPassword = dto.getPassword();
        doctor.setPassword(passwordEncoder.encode(rawPassword));
        doctor.setSpecialization(dto.getSpecialization());

        doctorRepository.save(doctor);

        // Send email to doctor with credentials
        String subject = "Welcome to Ayurveda System - Doctor Account Created";
        String body = "Dear " + doctor.getName() + ",\n\n"
                + "Your doctor account has been created successfully.\n"
                + "Here are your login credentials:\n\n"
                + "Email: " + doctor.getEmail() + "\n"
                + "Password: " + rawPassword + "\n\n"
                + "Please login and change your password after first login.\n\n"
                + "Regards,\nAyurveda Admin Team";

        emailService.sendEmail(doctor.getEmail(), subject, body);

        return "Doctor registered successfully and email sent!";
    }
    @GetMapping("/getAllDoctors")
    public List<DoctorResponseDTO> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        return doctors.stream()
                .map(this::toDoctorDTO)   // convert each Doctor -> DoctorResponseDTO
                .collect(Collectors.toList());
    }

    private DoctorResponseDTO toDoctorDTO(Doctor doctor) {
        return new DoctorResponseDTO(
                doctor.getId(),
                doctor.getName(),
                doctor.getEmail(),
                doctor.getSpecialization()
        );
    }

}
