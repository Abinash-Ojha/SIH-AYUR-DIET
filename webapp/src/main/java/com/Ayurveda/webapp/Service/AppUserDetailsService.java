package com.Ayurveda.webapp.Service;

import com.Ayurveda.webapp.Repository.AdminRepository;
import com.Ayurveda.webapp.Repository.DoctorRepository;
import com.Ayurveda.webapp.Repository.PatientAuthRepository;
import com.Ayurveda.webapp.Repository.PatientRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final DoctorRepository doctorRepository;
    private final AdminRepository adminRepository;
    private final PatientAuthRepository patientAuthRepository;

    public AppUserDetailsService(DoctorRepository doctorRepository,
                                 AdminRepository adminRepository,
                                 PatientAuthRepository patientAuthRepository) {
        this.doctorRepository = doctorRepository;
        this.adminRepository = adminRepository;
        this.patientAuthRepository = patientAuthRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 🔹 1. Check Admin
        var adminOpt = adminRepository.findByEmail(username);
        if (adminOpt.isPresent()) {
            var admin = adminOpt.get();
            return User.builder()
                    .username(admin.getEmail())
                    .password(admin.getPassword())
                    .roles("ADMIN")
                    .build();
        }

        // 🔹 2. Check Doctor
        var doctorOpt = doctorRepository.findByEmail(username);
        if (doctorOpt.isPresent()) {
            var doctor = doctorOpt.get();
            return User.builder()
                    .username(doctor.getEmail())
                    .password(doctor.getPassword())
                    .roles("DOCTOR")
                    .build();
        }

        // 🔹 3. Check PatientAuth
        var patientAuthOpt = patientAuthRepository.findByEmail(username);
        if (patientAuthOpt.isPresent()) {
            var patient = patientAuthOpt.get();
            return User.builder()
                    .username(patient.getEmail())
                    .password(patient.getPassword())
                    .roles("PATIENT")
                    .build();
        }

        // ❌ Not found
        throw new UsernameNotFoundException("User not found: " + username);
    }
}
