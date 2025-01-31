import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map,tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Professeur } from '../../models/Professor.model';

@Injectable({
  providedIn: 'root'
})

export class ProfService {
 private apiUrlp = 'http://localhost:8080/BACKEND/api/professeurs'; 
  constructor(private http: HttpClient) { }
  getProfesseurById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlp}/userid/${id}`);
  }
}
