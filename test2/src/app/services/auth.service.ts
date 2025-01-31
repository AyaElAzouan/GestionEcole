import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { throwError } from 'rxjs';

// Modèle pour l'utilisateur
export interface UserLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  private apiUrl = 'http://localhost:8080/BACKEND/api/auth';


  constructor(private http: HttpClient) {}

  // Méthode pour se connecter
  login(credentials: { Email: string; Password: string }): Observable<any> {
    const loginUrl = `${this.apiUrl}/authenticate`;
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<any>(loginUrl, credentials, { headers }).pipe(
      map((response) => {
        console.log('Login successful:', response);
        if (response && response.token) {
          console.log(response.token)
          localStorage.setItem('JwtToken', response.token);
          console.log(localStorage.getItem('JwtToken'));
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Erreur lors de la connexion'));
      })
    );
  }

  registerProf(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerProf`, userData);
  }
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }


  logout(): void {
    localStorage.removeItem('JwtToken');
    console.log('Utilisateur déconnecté, token supprimé.');
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('JwtToken');
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  currentUser(): UserLogin | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload: any = jwtDecode(token);
      if (tokenPayload) {
        const user: UserLogin = {
          email: tokenPayload.sub, // "sub" est généralement l'email ou l'identifiant de l'utilisateur
          password: '', // Le mot de passe n'est pas stocké dans le token
        };
        return user;
      }
    }
    return null;
  }

  // Méthode pour récupérer le rôle de l'utilisateur actuel
  currentUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload: any = jwtDecode(token);
      if (tokenPayload.role && tokenPayload.role.length > 0) {
        return tokenPayload.role[0].authority; // Supposons que le rôle est stocké dans un tableau "role"
      }
    }
    return null;
  }

  // Méthode pour déconnecter automatiquement après expiration du token
  autoLogout(expirationTime: number): void {
    setTimeout(() => {
      this.logout();
      console.log('Déconnexion automatique après expiration du token.');
    }, expirationTime);
  }

  // Méthode pour récupérer les emails des professeurs (exemple)
  getProfessorEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/professors/emails`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des emails:', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }


  getUserId(): number | null {
    const token = this.getToken();

    if (token) {
      const tokenPayload: any = jwtDecode(token);

      if (tokenPayload && tokenPayload.userId) {
        return tokenPayload.userId;
      }
    }

    return null;
  }

}

