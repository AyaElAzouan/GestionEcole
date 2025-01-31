package com.proj.backend.DTOs;

public class ProfesseurDTO {
    private Long id;
    private String cin;
    private String code;
    private String nom;
    private String prenom;
    private String adresse;
    private String numTele;
    private String email;

    // Constructeur, Getters et Setters
    public ProfesseurDTO(Long id, String cin, String code, String nom, String prenom, String adresse, String numTele, String email) {
        this.id = id;
        this.cin = cin;
        this.code = code;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.numTele = numTele;
        this.email = email;
    }

    // Getters et setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNumTele() {
        return numTele;
    }

    public void setNumTele(String numTele) {
        this.numTele = numTele;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
