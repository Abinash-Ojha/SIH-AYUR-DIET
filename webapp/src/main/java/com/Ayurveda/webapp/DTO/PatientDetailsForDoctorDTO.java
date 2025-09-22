package com.Ayurveda.webapp.DTO;

public class PatientDetailsForDoctorDTO {
    private Long id;
    private String fullName;
    private String email;
    private String aadharNumber;
    public PatientDetailsForDoctorDTO( String fullName, String email, String aadharNumber) {
        this.fullName = fullName;
        this.email = email;
        this.aadharNumber = aadharNumber;
    }
    public PatientDetailsForDoctorDTO(Long id,String fullName,String email){
        this.id=id;
        this.fullName=fullName;
        this.email=email;
    }

    // getters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }
}
