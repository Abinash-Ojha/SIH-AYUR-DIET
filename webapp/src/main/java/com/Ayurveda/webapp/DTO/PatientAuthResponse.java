package com.Ayurveda.webapp.DTO;

public class PatientAuthResponse extends AuthResponse {
    private String fullName;
    private String email;
    private String aadharNumber;

    public PatientAuthResponse(String token, String role,
                               String fullName, String email, String aadharNumber) {
        super(token, role);
        this.fullName = fullName;
        this.email = email;
        this.aadharNumber = aadharNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }
}
