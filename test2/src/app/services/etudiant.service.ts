import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Etudiant} from "../models/etudiant.model";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private apiUrl = 'http://localhost:8080/STUDENT-SERVICE/api/etudiants';

  constructor(private http: HttpClient) {}

  // Récupérer la liste des étudiants
  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  //  Récupérer un étudiant par ID
  getEtudiantById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }

  //  Ajouter un nouvel étudiant
  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.apiUrl, etudiant);
  }

  //  Modifier un étudiant
  updateEtudiant(id: number, etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/${id}`, etudiant);
  }

  //  Supprimer un étudiant
  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  //  Nouvelle méthode pour récupérer le total des étudiants
  getTotalEtudiants(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Total`);
  }
}
