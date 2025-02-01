import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Etudiant} from "../models/etudiant.model";
import {Matiere} from "../models/matière.model";

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private apiUrl = 'http://localhost:8080/MATIERESERVICE/api/matieres';

  constructor(private http: HttpClient) {}


  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.apiUrl);
  }

  getMatiereById(id: number): Observable<Matiere> {
    return this.http.get<Matiere>(`${this.apiUrl}/${id}`);
  }


  addMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(this.apiUrl, matiere);
  }


  updateMatiere(id: number, matiere: Matiere): Observable<Matiere> {
    return this.http.put<Matiere>(`${this.apiUrl}/${id}`, matiere);
  }


  deleteMatiere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  //  Nouvelle méthode pour récupérer le total des étudiants
  getTotaMatieres(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }
  getProfMatieres(id:number):Observable<Matiere[]> {
  return this.http.get<Matiere[]>(`${this.apiUrl}/prof/${id}`);
  }

  assignerProfesseur(id: number, profId: number): Observable<Matiere> {
    return this.http.put<Matiere>('${this.apiUrl}/assigner/${id}?ProfId=${profId}', {}); // On n'a pas besoin de body pour cette API
  }
}
