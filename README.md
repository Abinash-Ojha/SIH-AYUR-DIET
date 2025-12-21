# AyurDiet 🌿

**AyurDiet** is a comprehensive cloud-based **Practice Management & Nutrient Analysis Software** designed specifically for **Ayurvedic dietitians**. It bridges the gap between **traditional Ayurvedic dietary principles** and **modern nutritional science**, enabling doctors to generate accurate, personalized, and scalable diet plans digitally.

---

## 🧩 Problem Statement (ID – 25024)

**Theme:** MedTech / BioTech / HealthTech

Ayurvedic dietitians currently lack a **digital-first platform** to manage patients and create diet plans rooted in **Ayurveda-centric concepts** such as Dosha, Rasa, Virya, and Vipaka. Existing tools focus mainly on modern nutrition, leaving no structured, scalable solution for holistic Ayurvedic diet planning.

---

## ✨ Solution: AyurDiet

AyurDiet provides an **end-to-end cloud-based system** that empowers Ayurvedic practitioners to manage patients, analyze nutrition, and generate **doctor-ready 7-day diet charts** within minutes.

### Key Highlights

* 🌿 Combines **Ayurveda principles** (Dosha, Rasa, Virya, Vipaka) with **modern nutrition metrics** (Calories, Protein, Carbs, Fats, etc.)
* ⚡ Auto-generates **personalized 7-day diet plans**
* 🤖 AI/ML-powered recommendations for smarter diet suggestions
* 🗂️ Digital, structured, searchable alternative to handwritten diet charts
* 🏥 Scalable solution for **individual dietitians, clinics, and hospitals**

---

## ⚙️ Tech Stack

### Frontend

* React
* Tailwind CSS

### Backend

* Spring Boot
* Spring WebFlux (for real-time ML model communication)
* Spring Security
* JWT Authentication
* Role-Based Access Control (RBAC)

  * Admin
  * Doctor
  * Patient

### Database

* postgresql(neon.tech)

### Machine Learning

* TensorFlow
* Pandas

---

## 🔁 System Flow & Architecture

* **Spring WebFlux** enables real-time requests to ML models
* ML services analyze patient data and return Ayurvedic + nutritional insights
* Backend processes results and generates structured diet plans
* Secure access ensured via JWT & RBAC

---

## 👩‍⚕️ User Roles & Workflow

### Admin

* Registers and manages doctors

### Doctor

* Manages patient profiles
* Triggers Ayurvedic + nutritional analysis via ML models
* Generates and sends **7-day personalized diet plans**

### Patient

* Accesses diet plans and reports using a **secure unique token**
* Views plans directly linked to their doctor

---

## 🚀 Deployment

* **Frontend:** Netlify
* **Backend:** GitHub → Render
* **Database:** MySQL on Railway

---

## 📌 Use Cases

* Ayurvedic dietitians creating personalized diet charts
* Clinics digitizing diet consultations
* Hospitals scaling Ayurveda-based nutrition planning

---

## 🔮 Future Enhancements

* Advanced patient analytics dashboard
* Multilingual diet plan support
* Mobile application integration
* Expanded ML models for deeper personalization

---

## 📄 License

This project is developed for educational and healthcare innovation purposes under the MedTech/BioTech/HealthTech theme.

---

> *AyurDiet aims to modernize Ayurvedic nutrition while preserving its holistic foundation.* 🌱
