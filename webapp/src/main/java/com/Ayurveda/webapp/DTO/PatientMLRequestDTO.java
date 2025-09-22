package com.Ayurveda.webapp.DTO;

import java.util.List;

public class PatientMLRequestDTO {
    private String patient_id; // id ya custom string
    private int age;
    private String gender;
    private double height;
    private double weight;
    private String activity_level;
    private String goals;
    private String country;
    private String state;
    private String city;
    private String climate;
    private String diet_type;
    private List<String> cuisine_preferences;
    private List<String> favorite_foods;
    private List<String> disliked_foods;
    private List<String> allergies;
    private List<String> food_intolerances;
    private List<String> medical_conditions;
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
    private double water_intake;
    private String occupation;
    private String workout_type;
    private String workout_intensity;
    private Integer workout_frequency;
    private Boolean smoking;
    private String alcohol;
    private String caffeine_intake;
    private String season;
    private String consultation_date;

    // getters and setters


    public String getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(String patient_id) {
        this.patient_id = patient_id;
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

    public String getActivity_level() {
        return activity_level;
    }

    public void setActivity_level(String activity_level) {
        this.activity_level = activity_level;
    }

    public String getGoals() {
        return goals;
    }

    public void setGoals(String goals) {
        this.goals = goals;
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

    public List<String> getCuisine_preferences() {
        return cuisine_preferences;
    }

    public void setCuisine_preferences(List<String> cuisine_preferences) {
        this.cuisine_preferences = cuisine_preferences;
    }

    public List<String> getFavorite_foods() {
        return favorite_foods;
    }

    public void setFavorite_foods(List<String> favorite_foods) {
        this.favorite_foods = favorite_foods;
    }

    public List<String> getDisliked_foods() {
        return disliked_foods;
    }

    public void setDisliked_foods(List<String> disliked_foods) {
        this.disliked_foods = disliked_foods;
    }

    public List<String> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<String> allergies) {
        this.allergies = allergies;
    }

    public List<String> getFood_intolerances() {
        return food_intolerances;
    }

    public void setFood_intolerances(List<String> food_intolerances) {
        this.food_intolerances = food_intolerances;
    }

    public List<String> getMedical_conditions() {
        return medical_conditions;
    }

    public void setMedical_conditions(List<String> medical_conditions) {
        this.medical_conditions = medical_conditions;
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

    public double getWater_intake() {
        return water_intake;
    }

    public void setWater_intake(double water_intake) {
        this.water_intake = water_intake;
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
}

