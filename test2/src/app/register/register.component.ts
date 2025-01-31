import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserRole } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  alertType: string | null = null;  // 'success' ou 'danger'
  alertMessage: string | null = null;
  selectedRole: UserRole | null = null;
  adminForm: FormGroup;
  secretaireForm: FormGroup;
  profForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {
    // Initialize all forms
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['']
    });

    this.secretaireForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['']
    });

    this.profForm = this.fb.group({
      cin: ['', Validators.required],
      code: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      numTele: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role:['']
    });
  }

  selectRole(role: UserRole) {
    this.selectedRole = role;
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    let currentForm: FormGroup;
    let roleValue = '';

    switch (this.selectedRole) {
      case 'admin':
        currentForm = this.adminForm;
        roleValue = 'ADMIN';
        break;
      case 'secretaire':
        currentForm = this.secretaireForm;
        roleValue = 'SECRAITAIRE';
        break;
      case 'prof':
        currentForm = this.profForm;
        roleValue = 'PROFESSEUR';
        break;
      default:
        return;
    }

    // Affecter la valeur du rôle
    currentForm.patchValue({ role: roleValue });

    if (currentForm.valid && roleValue=='PROFESSEUR') {
        // Transformer les données avant l'envoi
        const formattedData = {
            cin: currentForm.value.cin || '',
            code: currentForm.value.code || '',
            nom: currentForm.value.nom || '',
            prenom: currentForm.value.prenom || '',
            adresse: currentForm.value.adresse || '',
            numTele: currentForm.value.numTele || '',
            user: {
                email: currentForm.value.email || '',
                password: currentForm.value.password || '',
                role: currentForm.value.role || ''
            }
        };

        console.log('Données envoyées:', formattedData);
      
        this.authService.registerProf(formattedData).subscribe(
          response => {
            console.log('Utilisateur enregistré avec succès:', response);
            this.alertType = 'success';
            this.alertMessage = 'Utilisateur enregistré avec succès !';
            this.router.navigate(['/login']);
            
          },
          error => {
            console.error('Erreur lors de l\'inscription:', error);
            this.alertType = 'danger';
            this.alertMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
          }
        );
      
      }else if(currentForm.valid && roleValue=='ADMIN' || roleValue=='SECRAITAIRE'){
        const formattedData = {
              email: currentForm.value.email || '',
              password: currentForm.value.password || '',
              role: currentForm.value.role || ''  
      };

      console.log('Données envoyées:', formattedData);
    
      this.authService.registerUser(formattedData).subscribe(
        response => {
          console.log('Utilisateur enregistré avec succès:', response);
          this.alertType = 'success';
          this.alertMessage = 'Utilisateur enregistré avec succès !';
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Erreur lors de l\'inscription:', error);
          this.alertType = 'danger';
          this.alertMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        }
      );
    } else {
    console.log('Formulaire invalide');
    this.alertType = 'danger';
    this.alertMessage = 'Formulaire invalide. Veuillez vérifier vos informations.';
  }
    
}

}
