package com.Ayurveda.webapp.DTO;

public class AdminAuthResponse extends AuthResponse{
    private String email;

    public AdminAuthResponse(String token, String role, String email) {
        super(token, role);
        this.email = email;
    }

    public String getEmail() { return email; }
}
