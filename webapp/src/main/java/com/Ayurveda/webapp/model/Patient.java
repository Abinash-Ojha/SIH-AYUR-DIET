package com.Ayurveda.webapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // -------------------------
    // 1. Patient Demographics
    // -------------------------
    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String gender; // Male/Female/Other

    @Column
    private double height; // in cm

    @Column
    private double weight; // in kg

    @Column
    private Double bmi; // auto-calculated, can be nullable

    @Column
    private Double bodyFatPercentage; // optional

    @Column
    private String activityLevel; // sedentary, light, moderate, active, very active

    @Column
    private String occupationType; // desk job, field work, student, etc.

    // -------------------------
    // 2. Lifestyle & Medical History
    // -------------------------
    @Column
    private String existingConditions; // diabetes, hypertension, etc.

    @Column
    private String medications; // iron, B12, steroids, etc.

    @Column
    private String allergies; // milk, gluten, nuts, etc.

    @Column
    private String sleepQuality; // restless/good

    @Column
    private String stressLevel; // low/medium/high

    @Column
    private String digestion; // constipation/loose/irregular

    @Column
    private Double waterIntake; // liters/day

    @Column
    private String addictions; // smoking, alcohol, caffeine

    // -------------------------
    // 3. Ayurveda-Specific Parameters
    // -------------------------
    @Column
    private String prakritiType; // Vata / Pitta / Kapha / dual

    @Column
    private String vikruti; // current imbalance

    @Column
    private String agni; // manda/sama/tikshna

    @Column
    private String bowelHabits; // constipation/loose/sluggish

    @Column
    private String sleepPattern; // insomnia/interrupted/heavy

    @Column
    private String appetite; // variable/intense/low

    @Column
    private String season; // summer, winter, rainy

    @Column
    private String geographicLocation; // humid coast, desert, etc.

    @Column
    private String emotionalTendencies; // anxious/irritable/lethargic

    // -------------------------
    // 4. Dietary Preferences & Habits
    // -------------------------
    @Column
    private String dietType; // veg/non-veg/vegan/Jain

    @Column
    private String cuisinePreference; // Indian, international, local

    @Column
    private Integer mealFrequency; // meals/day

    @Column
    private String favoriteFoods;

    @Column
    private String dislikedFoods;

    @Column
    private String cookingMethods; // fried, steamed, baked, raw

    @Column
    private String budgetAccess; // urban/rural/low budget

    // -------------------------
    // 5. Nutritional Requirements
    // -------------------------
    @Column
    private Double calorieTarget; // BMR × activity

    @Column
    private String macronutrientSplit; // protein/carb/fat %

    @Column
    private String micronutrientFocus; // iron, calcium, vitamin D

    // -------------------------
    // 6. Goals
    // -------------------------
    @Column
    private String goalType; // weight loss/gain/maintenance

    @Column
    private String medicalGoals; // blood sugar control, PCOD mgmt

    @Column
    private String athleticPerformance; // strength/endurance

    @Column
    private String wellnessGoals; // immunity boost, longevity


   //------------------------------- //extra fileds ------------------------------------
    @Column
    private String country;

    @Column
    private String state;

    @Column
    private String city;

    @Column
    private String climate;

    @Column
    private String foodIntolerances; // comma-separated or use @ElementCollection

    @Column
    private String medicalConditions; // can separate from existingConditions

    @Column
    private String bowelMovements;

    @Column
    private String energyLevels;

    @Column
    private String mentalWorkload;

    @Column
    private String bodyFrame;

    @Column
    private String muscleTone;

    @Column
    private String skinType;

    @Column
    private String hairType;

    @Column
    private String voiceQuality;

    @Column
    private String temperaturePreference;

    @Column
    private String sweatPattern;

    @Column
    private String occupation;

    @Column
    private String workoutType;

    @Column
    private String workoutIntensity;

    @Column
    private Integer workoutFrequency;

    @Column
    private Boolean smoking;

    @Column
    private String alcohol;

    @Column
    private String caffeineIntake;

    @Column
    private String consultationDate;


    // -------------------------
    // Relationship
    // -------------------------
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonBackReference
    private Doctor doctor;

    // Getters and Setters (generate using Lombok if you want to save time)
    // ...


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

    public String getFoodIntolerances() {
        return foodIntolerances;
    }

    public void setFoodIntolerances(String foodIntolerances) {
        this.foodIntolerances = foodIntolerances;
    }

    public String getMedicalConditions() {
        return medicalConditions;
    }

    public void setMedicalConditions(String medicalConditions) {
        this.medicalConditions = medicalConditions;
    }

    public String getBowelMovements() {
        return bowelMovements;
    }

    public void setBowelMovements(String bowelMovements) {
        this.bowelMovements = bowelMovements;
    }

    public String getEnergyLevels() {
        return energyLevels;
    }

    public void setEnergyLevels(String energyLevels) {
        this.energyLevels = energyLevels;
    }

    public String getMentalWorkload() {
        return mentalWorkload;
    }

    public void setMentalWorkload(String mentalWorkload) {
        this.mentalWorkload = mentalWorkload;
    }

    public String getBodyFrame() {
        return bodyFrame;
    }

    public void setBodyFrame(String bodyFrame) {
        this.bodyFrame = bodyFrame;
    }

    public String getMuscleTone() {
        return muscleTone;
    }

    public void setMuscleTone(String muscleTone) {
        this.muscleTone = muscleTone;
    }

    public String getSkinType() {
        return skinType;
    }

    public void setSkinType(String skinType) {
        this.skinType = skinType;
    }

    public String getHairType() {
        return hairType;
    }

    public void setHairType(String hairType) {
        this.hairType = hairType;
    }

    public String getVoiceQuality() {
        return voiceQuality;
    }

    public void setVoiceQuality(String voiceQuality) {
        this.voiceQuality = voiceQuality;
    }

    public String getTemperaturePreference() {
        return temperaturePreference;
    }

    public void setTemperaturePreference(String temperaturePreference) {
        this.temperaturePreference = temperaturePreference;
    }

    public String getSweatPattern() {
        return sweatPattern;
    }

    public void setSweatPattern(String sweatPattern) {
        this.sweatPattern = sweatPattern;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getWorkoutType() {
        return workoutType;
    }

    public void setWorkoutType(String workoutType) {
        this.workoutType = workoutType;
    }

    public String getWorkoutIntensity() {
        return workoutIntensity;
    }

    public void setWorkoutIntensity(String workoutIntensity) {
        this.workoutIntensity = workoutIntensity;
    }

    public Integer getWorkoutFrequency() {
        return workoutFrequency;
    }

    public void setWorkoutFrequency(Integer workoutFrequency) {
        this.workoutFrequency = workoutFrequency;
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

    public String getCaffeineIntake() {
        return caffeineIntake;
    }

    public void setCaffeineIntake(String caffeineIntake) {
        this.caffeineIntake = caffeineIntake;
    }

    public String getConsultationDate() {
        return consultationDate;
    }

    public void setConsultationDate(String consultationDate) {
        this.consultationDate = consultationDate;
    }

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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    public Double getBodyFatPercentage() {
        return bodyFatPercentage;
    }

    public void setBodyFatPercentage(Double bodyFatPercentage) {
        this.bodyFatPercentage = bodyFatPercentage;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(String activityLevel) {
        this.activityLevel = activityLevel;
    }

    public String getOccupationType() {
        return occupationType;
    }

    public void setOccupationType(String occupationType) {
        this.occupationType = occupationType;
    }

    public String getExistingConditions() {
        return existingConditions;
    }

    public void setExistingConditions(String existingConditions) {
        this.existingConditions = existingConditions;
    }

    public String getMedications() {
        return medications;
    }

    public void setMedications(String medications) {
        this.medications = medications;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public String getSleepQuality() {
        return sleepQuality;
    }

    public void setSleepQuality(String sleepQuality) {
        this.sleepQuality = sleepQuality;
    }

    public String getStressLevel() {
        return stressLevel;
    }

    public void setStressLevel(String stressLevel) {
        this.stressLevel = stressLevel;
    }

    public String getDigestion() {
        return digestion;
    }

    public void setDigestion(String digestion) {
        this.digestion = digestion;
    }

    public Double getWaterIntake() {
        return waterIntake;
    }

    public void setWaterIntake(Double waterIntake) {
        this.waterIntake = waterIntake;
    }

    public String getAddictions() {
        return addictions;
    }

    public void setAddictions(String addictions) {
        this.addictions = addictions;
    }

    public String getPrakritiType() {
        return prakritiType;
    }

    public void setPrakritiType(String prakritiType) {
        this.prakritiType = prakritiType;
    }

    public String getVikruti() {
        return vikruti;
    }

    public void setVikruti(String vikruti) {
        this.vikruti = vikruti;
    }

    public String getAgni() {
        return agni;
    }

    public void setAgni(String agni) {
        this.agni = agni;
    }

    public String getBowelHabits() {
        return bowelHabits;
    }

    public void setBowelHabits(String bowelHabits) {
        this.bowelHabits = bowelHabits;
    }

    public String getSleepPattern() {
        return sleepPattern;
    }

    public void setSleepPattern(String sleepPattern) {
        this.sleepPattern = sleepPattern;
    }

    public String getAppetite() {
        return appetite;
    }

    public void setAppetite(String appetite) {
        this.appetite = appetite;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getGeographicLocation() {
        return geographicLocation;
    }

    public void setGeographicLocation(String geographicLocation) {
        this.geographicLocation = geographicLocation;
    }

    public String getEmotionalTendencies() {
        return emotionalTendencies;
    }

    public void setEmotionalTendencies(String emotionalTendencies) {
        this.emotionalTendencies = emotionalTendencies;
    }

    public String getDietType() {
        return dietType;
    }

    public void setDietType(String dietType) {
        this.dietType = dietType;
    }

    public String getCuisinePreference() {
        return cuisinePreference;
    }

    public void setCuisinePreference(String cuisinePreference) {
        this.cuisinePreference = cuisinePreference;
    }

    public Integer getMealFrequency() {
        return mealFrequency;
    }

    public void setMealFrequency(Integer mealFrequency) {
        this.mealFrequency = mealFrequency;
    }

    public String getFavoriteFoods() {
        return favoriteFoods;
    }

    public void setFavoriteFoods(String favoriteFoods) {
        this.favoriteFoods = favoriteFoods;
    }

    public String getDislikedFoods() {
        return dislikedFoods;
    }

    public void setDislikedFoods(String dislikedFoods) {
        this.dislikedFoods = dislikedFoods;
    }

    public String getCookingMethods() {
        return cookingMethods;
    }

    public void setCookingMethods(String cookingMethods) {
        this.cookingMethods = cookingMethods;
    }

    public String getBudgetAccess() {
        return budgetAccess;
    }

    public void setBudgetAccess(String budgetAccess) {
        this.budgetAccess = budgetAccess;
    }

    public Double getCalorieTarget() {
        return calorieTarget;
    }

    public void setCalorieTarget(Double calorieTarget) {
        this.calorieTarget = calorieTarget;
    }

    public String getMacronutrientSplit() {
        return macronutrientSplit;
    }

    public void setMacronutrientSplit(String macronutrientSplit) {
        this.macronutrientSplit = macronutrientSplit;
    }

    public String getMicronutrientFocus() {
        return micronutrientFocus;
    }

    public void setMicronutrientFocus(String micronutrientFocus) {
        this.micronutrientFocus = micronutrientFocus;
    }

    public String getGoalType() {
        return goalType;
    }

    public void setGoalType(String goalType) {
        this.goalType = goalType;
    }

    public String getMedicalGoals() {
        return medicalGoals;
    }

    public void setMedicalGoals(String medicalGoals) {
        this.medicalGoals = medicalGoals;
    }

    public String getAthleticPerformance() {
        return athleticPerformance;
    }

    public void setAthleticPerformance(String athleticPerformance) {
        this.athleticPerformance = athleticPerformance;
    }

    public String getWellnessGoals() {
        return wellnessGoals;
    }

    public void setWellnessGoals(String wellnessGoals) {
        this.wellnessGoals = wellnessGoals;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
}
