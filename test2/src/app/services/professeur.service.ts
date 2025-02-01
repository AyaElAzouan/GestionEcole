import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prof } from '../models/Prof.model';
import {Etudiant} from "../models/etudiant.model";
import {AuthService} from "./auth.service"; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  private apiUrl = 'http://localhost:8080/BACKEND/api/professeurs';

  constructor(private http: HttpClient,
              private authService:AuthService,
             ) {}

  getProfs(): Observable<Prof[]> {
    return this.http.get<Prof[]>(this.apiUrl);
  }

  getProfById(id: number): Observable<Prof> {
    if (!id) {
      throw new Error('ID du professeur invalide');
    }
    return this.http.get<Prof>(`${this.apiUrl}/${id}`);
  }
  // Mettre à jour un professeur avec ajout du token dans les en-têtes
  updateProf(id: number, updatedProf: {
    matieres: any;
    code: any;
    adresse: any;
    cin: any;
    numTele: any;
    nom: any;
    prenom: any;
    user: { password: any; role: any; email: any }
  }): Observable<Prof> {
    return this.http.put<Prof>(`http://localhost:8080/BACKEND/api/auth/prof/${id}`, updatedProf);
  }
  deleteProf(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  addMatiereToProfesseur(profId: number, matiereId: number): Observable<Prof> {
    return this.http.put<Prof>(`${this.apiUrl}/${profId}/ajouterMatiere/${matiereId}`, {});
  }
getTotalProf(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Total`);
  }
}
