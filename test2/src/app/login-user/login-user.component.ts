import { Component ,Inject,inject,OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import {FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { UserLogin } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from '../services/notifications.service';
 
@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit {
  loginForm !: FormGroup;
  authenticatedUser!: UserLogin | null;
  authService = inject(AuthService);
  router = inject(Router);
  notification=inject(NotificationsService);
  message!: string;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
    password: ['', [Validators.required]],
    email: ['', Validators.required]
    });
    }
  ngOnInit(): void {}
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
      .subscribe((data: any) => {
   
        if(this.authService.isAuthenticated()){
          this.authenticatedUser = this.authService.currentUser();
          console.log(this.authenticatedUser);
          console.log(this.authService.currentUserRole());
          this.router.navigate(['/user-compte']);

         
        }else {
        
          // Gérer le cas où l'utilisateur n'est pas authentifié
          this.message = "L'identifiant utilisateur ou le mot de passe est incorrect.";
          console.log(this.message);
         
        }
      },
         (err: any) => {  
          // Gérer les erreurs de l'authentification
          this.message = "Une erreur s'est produite lors de l'authentification. Veuillez réessayer plus tard.";
          console.error("Erreur lors de l'authentification :", err);
         
        }
      );
    }
    
  }
  redirectToSignup() {
    this.router.navigate(['/register']);
  }
}
