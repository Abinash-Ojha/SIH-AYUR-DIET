package com.Ayurveda.webapp.DTO;

public class SaveDietRequest {
    private String responseText;
    private String doctorsRemark;

    public String getResponseText() {
        return responseText;
    }

    public void setResponseText(String responseText) {
        this.responseText = responseText;
    }

    public String getDoctorsRemark() {
        return doctorsRemark;
    }

    public void setDoctorsRemark(String doctorsRemark) {
        this.doctorsRemark = doctorsRemark;
    }
}
