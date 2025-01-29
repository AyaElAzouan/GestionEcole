import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserLogin } from '../models/user.model';
import { catchError, map,tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'; // L'URL de l'API

  constructor(private http: HttpClient) {}

  
  login(data: any) {
    const loginUrl = `${this.apiUrl}/authenticate`;
  
    return this.http.post<any>(loginUrl, data).pipe(
      map(response => {
        console.log("Réponse de l'API:", response);
        if (response && response.token) {  // Vérifiez si le token est présent dans la réponse
          localStorage.setItem('JwtToken', response.token);  // Sauvegardez le token dans localStorage
          const jwtToken = localStorage.getItem('JwtToken');
          if (jwtToken) {
            console.log('Token JWT:', jwtToken);
          } else {
            console.log('Aucun token trouvé');
          }
        }
        return response;
      }),
      catchError(error => {
        console.error("Erreur d'authentification:", error);
        return of(error);  // Retourne l'erreur sous forme d'observable
      })
    );
  }
  
  
  logout(): void {
    localStorage.removeItem('JwtToken');
  }

  getToken(): string {
    return localStorage.getItem('JwtToken') || 'null';
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }



  currentUser(): UserLogin | null {
    if (this.getToken()) {
      const tokenPayload: any = jwtDecode(this.getToken());
      if (tokenPayload) {
        const user: UserLogin = {
          email: tokenPayload.sub,
          password: '',
        };
        return user;
      }
    }
    return null;
  }
  currentUserRole(): string | null {
    const token = this.getToken();

    if (token) {
      const tokenPayload: any = jwtDecode(token);

      
      if (tokenPayload.role && tokenPayload.role.length > 0) {
        return tokenPayload.role[0].authority; 
      }
    }

    return null;
  }


  autoLogout(dateExpiration: number): void {
    setTimeout(() => {
      this.logout();
    }, dateExpiration);
  }

  getProfessorEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/authenticate/professors/emails`);
  }

}
