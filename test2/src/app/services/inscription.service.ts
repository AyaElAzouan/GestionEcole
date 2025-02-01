import { Injectable } from '@angular/core';
import {Etudiant} from "../models/etudiant.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Inscription} from "../models/inscription.model";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = 'http://localhost:8080/INSCRIPTIONSERVICE/api/inscriptions';

  constructor(private http: HttpClient,) {

  }
  // Méthode pour ajouter une inscription
  addInscription(inscription: Inscription): Observable<Inscription> {
    return this.http.post<Inscription>(this.apiUrl, inscription);
  }
  //  Récupérer toutes les inscriptions
  getAllInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(this.apiUrl);
  }

  //  Récupérer une inscription par ID
  getInscriptionById(id: number): Observable<Inscription> {
    return this.http.get<Inscription>(`${this.apiUrl}/${id}`);
  }



  //  Récupérer les inscriptions d'un étudiant
  getInscriptionsByEtudiant(etudiantId: number): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/etudiant/${etudiantId}`);
  }
  getInscriptionByModule(id: number): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/modulee/${id}`);
  }
  // Récupérer le nombre total d'inscriptions
  getTotalInscriptions(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  //Récupérer le nombre d'inscriptions par module
  getInscriptionsCountByModule(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.apiUrl}/count-by-module`);
  }


  // Annuler une inscription à une matière pour un étudiant
  annulerInscription(etudiantId: number, matiereId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${etudiantId}/matieres/${matiereId}`);
  }



}
