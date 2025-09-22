package com.Ayurveda.webapp.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PatientResponseDTO {
    @JsonProperty("patient_id")
    private String patientId;

    private int age;
    private String gender;
    private double height;
    private double weight;

    @JsonProperty("activity_level")
    private String activityLevel;

    @JsonProperty("goals")
    private String goalType;

    private String country;
    private String state;
    private String city;
    private String climate;
    private String diet_type;

    @JsonProperty("cuisine_preferences")
    private List<String> cuisinePreferences;

    @JsonProperty("favorite_foods")
    private List<String> favoriteFoods;

    @JsonProperty("disliked_foods")
    private List<String> dislikedFoods;

    private List<String> allergies;

    @JsonProperty("food_intolerances")
    private List<String> foodIntolerances;

    @JsonProperty("medical_conditions")
    private List<String> medicalConditions;

    private String agni;
    private String digestion;
    private String appetite;
    private String bowel_movements;
    private String sleep_quality;
    private String energy_levels;
    private String emotional_tendencies;
    private String stress_levels;
    private String mental_workload;
    private String body_frame;
    private String muscle_tone;
    private String skin_type;
    private String hair_type;
    private String voice_quality;
    private String temperature_preference;
    private String sweat_pattern;
    private String occupation;
    private String workout_type;
    private String workout_intensity;
    private Integer workout_frequency;
    private Boolean smoking;
    private String alcohol;
    private String caffeine_intake;
    private String season;
    private String consultation_date;


    private DoctorResponseDTO doctor;

    // -------------------------
    // Constructor
    // -------------------------

    public PatientResponseDTO(String patientId, int age, String gender, double height, double weight, String activityLevel, String goalType, String country, String state, String city, String climate, String diet_type, List<String> cuisinePreferences, List<String> favoriteFoods, List<String> dislikedFoods, List<String> allergies, List<String> foodIntolerances, List<String> medicalConditions, String agni, String digestion, String appetite, String bowel_movements, String sleep_quality, String energy_levels, String emotional_tendencies, String stress_levels, String mental_workload, String body_frame, String muscle_tone, String skin_type, String hair_type, String voice_quality, String temperature_preference, String sweat_pattern, String occupation, String workout_type, String workout_intensity, Integer workout_frequency, Boolean smoking, String alcohol, String caffeine_intake, String season, String consultation_date) {
        this.patientId = patientId;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.goalType = goalType;
        this.country = country;
        this.state = state;
        this.city = city;
        this.climate = climate;
        this.diet_type = diet_type;
        this.cuisinePreferences = cuisinePreferences;
        this.favoriteFoods = favoriteFoods;
        this.dislikedFoods = dislikedFoods;
        this.allergies = allergies;
        this.foodIntolerances = foodIntolerances;
        this.medicalConditions = medicalConditions;
        this.agni = agni;
        this.digestion = digestion;
        this.appetite = appetite;
        this.bowel_movements = bowel_movements;
        this.sleep_quality = sleep_quality;
        this.energy_levels = energy_levels;
        this.emotional_tendencies = emotional_tendencies;
        this.stress_levels = stress_levels;
        this.mental_workload = mental_workload;
        this.body_frame = body_frame;
        this.muscle_tone = muscle_tone;
        this.skin_type = skin_type;
        this.hair_type = hair_type;
        this.voice_quality = voice_quality;
        this.temperature_preference = temperature_preference;
        this.sweat_pattern = sweat_pattern;
        this.occupation = occupation;
        this.workout_type = workout_type;
        this.workout_intensity = workout_intensity;
        this.workout_frequency = workout_frequency;
        this.smoking = smoking;
        this.alcohol = alcohol;
        this.caffeine_intake = caffeine_intake;
        this.season = season;
        this.consultation_date = consultation_date;
    }



    // Getters & Setters here...


    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(String activityLevel) {
        this.activityLevel = activityLevel;
    }

    public String getGoalType() {
        return goalType;
    }

    public void setGoalType(String goalType) {
        this.goalType = goalType;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getClimate() {
        return climate;
    }

    public void setClimate(String climate) {
        this.climate = climate;
    }

    public String getDiet_type() {
        return diet_type;
    }

    public void setDiet_type(String diet_type) {
        this.diet_type = diet_type;
    }

    public List<String> getCuisinePreferences() {
        return cuisinePreferences;
    }

    public void setCuisinePreferences(List<String> cuisinePreferences) {
        this.cuisinePreferences = cuisinePreferences;
    }

    public List<String> getFavoriteFoods() {
        return favoriteFoods;
    }

    public void setFavoriteFoods(List<String> favoriteFoods) {
        this.favoriteFoods = favoriteFoods;
    }

    public List<String> getDislikedFoods() {
        return dislikedFoods;
    }

    public void setDislikedFoods(List<String> dislikedFoods) {
        this.dislikedFoods = dislikedFoods;
    }

    public List<String> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<String> allergies) {
        this.allergies = allergies;
    }

    public List<String> getFoodIntolerances() {
        return foodIntolerances;
    }

    public void setFoodIntolerances(List<String> foodIntolerances) {
        this.foodIntolerances = foodIntolerances;
    }

    public List<String> getMedicalConditions() {
        return medicalConditions;
    }

    public void setMedicalConditions(List<String> medicalConditions) {
        this.medicalConditions = medicalConditions;
    }

    public String getAgni() {
        return agni;
    }

    public void setAgni(String agni) {
        this.agni = agni;
    }

    public String getDigestion() {
        return digestion;
    }

    public void setDigestion(String digestion) {
        this.digestion = digestion;
    }

    public String getAppetite() {
        return appetite;
    }

    public void setAppetite(String appetite) {
        this.appetite = appetite;
    }

    public String getBowel_movements() {
        return bowel_movements;
    }

    public void setBowel_movements(String bowel_movements) {
        this.bowel_movements = bowel_movements;
    }

    public String getSleep_quality() {
        return sleep_quality;
    }

    public void setSleep_quality(String sleep_quality) {
        this.sleep_quality = sleep_quality;
    }

    public String getEnergy_levels() {
        return energy_levels;
    }

    public void setEnergy_levels(String energy_levels) {
        this.energy_levels = energy_levels;
    }

    public String getEmotional_tendencies() {
        return emotional_tendencies;
    }

    public void setEmotional_tendencies(String emotional_tendencies) {
        this.emotional_tendencies = emotional_tendencies;
    }

    public String getStress_levels() {
        return stress_levels;
    }

    public void setStress_levels(String stress_levels) {
        this.stress_levels = stress_levels;
    }

    public String getMental_workload() {
        return mental_workload;
    }

    public void setMental_workload(String mental_workload) {
        this.mental_workload = mental_workload;
    }

    public String getBody_frame() {
        return body_frame;
    }

    public void setBody_frame(String body_frame) {
        this.body_frame = body_frame;
    }

    public String getMuscle_tone() {
        return muscle_tone;
    }

    public void setMuscle_tone(String muscle_tone) {
        this.muscle_tone = muscle_tone;
    }

    public String getSkin_type() {
        return skin_type;
    }

    public void setSkin_type(String skin_type) {
        this.skin_type = skin_type;
    }

    public String getHair_type() {
        return hair_type;
    }

    public void setHair_type(String hair_type) {
        this.hair_type = hair_type;
    }

    public String getVoice_quality() {
        return voice_quality;
    }

    public void setVoice_quality(String voice_quality) {
        this.voice_quality = voice_quality;
    }

    public String getTemperature_preference() {
        return temperature_preference;
    }

    public void setTemperature_preference(String temperature_preference) {
        this.temperature_preference = temperature_preference;
    }

    public String getSweat_pattern() {
        return sweat_pattern;
    }

    public void setSweat_pattern(String sweat_pattern) {
        this.sweat_pattern = sweat_pattern;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getWorkout_type() {
        return workout_type;
    }

    public void setWorkout_type(String workout_type) {
        this.workout_type = workout_type;
    }

    public String getWorkout_intensity() {
        return workout_intensity;
    }

    public void setWorkout_intensity(String workout_intensity) {
        this.workout_intensity = workout_intensity;
    }

    public Integer getWorkout_frequency() {
        return workout_frequency;
    }

    public void setWorkout_frequency(Integer workout_frequency) {
        this.workout_frequency = workout_frequency;
    }

    public Boolean getSmoking() {
        return smoking;
    }

    public void setSmoking(Boolean smoking) {
        this.smoking = smoking;
    }

    public String getAlcohol() {
        return alcohol;
    }

    public void setAlcohol(String alcohol) {
        this.alcohol = alcohol;
    }

    public String getCaffeine_intake() {
        return caffeine_intake;
    }

    public void setCaffeine_intake(String caffeine_intake) {
        this.caffeine_intake = caffeine_intake;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getConsultation_date() {
        return consultation_date;
    }

    public void setConsultation_date(String consultation_date) {
        this.consultation_date = consultation_date;
    }

    public DoctorResponseDTO getDoctor() {
        return doctor;
    }

    public void setDoctor(DoctorResponseDTO doctor) {
        this.doctor = doctor;
    }
}
