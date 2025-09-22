package com.Ayurveda.webapp.DTO;

public class DoctorAuthResponse extends AuthResponse {
    private Long id;
    private String name;
    private String specialization;
    private String email;

    public DoctorAuthResponse(String token, String role, Long id, String name, String email, String specialization) {
        super(token, role);
        this.id = id;
        this.name = name;
        this.email = email;
        this.specialization = specialization;
    }

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
    public String getSpecialization() {
        return specialization;
    }
}
