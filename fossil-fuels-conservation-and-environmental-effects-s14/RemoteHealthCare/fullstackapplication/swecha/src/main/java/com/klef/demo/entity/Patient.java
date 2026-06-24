package com.klef.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50, unique = true)
    private String username;
    
    @Column(nullable = false, length = 50)
    private String password;
    
    @Column(nullable = false, length = 50, unique = true)
    private String email;
    
    @Column(nullable = false, length = 50)
    private String firstName;
    
    @Column(nullable = false, length = 50)
    private String lastName;
    
    @Column(nullable = false, length = 20, unique = true)
    private String contact;
    
    @Column(nullable = false, length = 50)
    private String gender;
    
    @Column(nullable = false, length = 100)
    private String location;
    
    @org.hibernate.annotations.CreationTimestamp
    @Column(updatable = false)
    private java.time.LocalDateTime registeredAt;
    
    private Integer age;
    private Integer healthScore;
    private Double recoveryPercentage;
    
    private String previousMedicalConditions;

    public Patient() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public java.time.LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(java.time.LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

    public Integer getHealthScore() {
        return healthScore;
    }

    public void setHealthScore(Integer healthScore) {
        this.healthScore = healthScore;
    }

    public Double getRecoveryPercentage() {
        return recoveryPercentage;
    }

    public void setRecoveryPercentage(Double recoveryPercentage) {
        this.recoveryPercentage = recoveryPercentage;
    }

    public String getPreviousMedicalConditions() {
        return previousMedicalConditions;
    }

    public void setPreviousMedicalConditions(String previousMedicalConditions) {
        this.previousMedicalConditions = previousMedicalConditions;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
