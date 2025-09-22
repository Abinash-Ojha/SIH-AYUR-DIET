package com.Ayurveda.webapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "diet_responses")
public class DietResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column( nullable = true, columnDefinition = "TEXT")
    private String analysis;// The diet plan from ML Model


    @Column( columnDefinition = "TEXT",nullable = true)
    private String plan;
    @Column(columnDefinition = "TEXT")
    private String doctorsRemark;

    @Column(nullable = false)
    private LocalDateTime createdAt;  // when this plan was generated
    @Column(nullable = false, unique = true)
    private String accessToken;   // 🔹 UUID stored here


    // Link to Doctor
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    // Link to Patient
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    // ===== Constructor =====
    public DietResponse() {
        // Auto-initialize createdAt when object is created
        this.createdAt = LocalDateTime.now();
    }

    // ===== Or use PrePersist instead =====
    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    // ===== Getters & Setters =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAnalysis() {
        return analysis;
    }

    public void setAnalysis(String analysis) {
        this.analysis = analysis;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public String getDoctorsRemark() {
        return doctorsRemark;
    }

    public void setDoctorsRemark(String doctorsRemark) {
        this.doctorsRemark = doctorsRemark;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
