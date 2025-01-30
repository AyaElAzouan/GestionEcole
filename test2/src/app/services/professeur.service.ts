import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Etudiant} from "../models/etudiant.model";
import {Prof} from "../models/Prof.model";

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

  private apiUrl = 'http://localhost:8080/BACKEND/api/professeurs';

  constructor(private http: HttpClient) {}

  getProfs(): Observable<Prof[]> {
    return this.http.get<Prof[]>(this.apiUrl);
  }
  getProfById(id: number): Observable<Prof> {
    if (!id) {
      throw new Error('ID du professeur invalide');
    }
    return this.http.get<Prof>(`${this.apiUrl}/${id}`);
  }
}
