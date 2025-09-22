package com.Ayurveda.webapp.DTO;
import java.time.LocalDateTime;

public class DietResponseDTO {

    private Long id;
    private String responseText;
    private String doctorsRemark;
    private LocalDateTime createdAt;
    private DoctorResponseDTO doctor; // only safe doctor info
    private PatientResponseDTO patient; // only safe patient info

    public DietResponseDTO(Long id, String responseText, String analysis, LocalDateTime createdAt, DoctorResponseDTO doctorDTO, PatientMLRequestDTO mldto) {}

    public DietResponseDTO(Long id, String responseText, LocalDateTime createdAt,
                           DoctorResponseDTO doctor, PatientResponseDTO patient) {
        this.id = id;
        this.responseText = responseText;
        this.createdAt = createdAt;
        this.doctor = doctor;
        this.patient = patient;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getResponseText() { return responseText; }
    public void setResponseText(String responseText) { this.responseText = responseText; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public DoctorResponseDTO getDoctor() { return doctor; }
    public void setDoctor(DoctorResponseDTO doctor) { this.doctor = doctor; }

    public PatientResponseDTO getPatient() { return patient; }
    public void setPatient(PatientResponseDTO patient) { this.patient = patient; }

    public String getDoctorsRemark() {
        return doctorsRemark;
    }

    public void setDoctorsRemark(String doctorsRemark) {
        this.doctorsRemark = doctorsRemark;
    }
}
