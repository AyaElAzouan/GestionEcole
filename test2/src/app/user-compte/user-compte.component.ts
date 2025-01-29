import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { NotificationsComponent } from '../notifications/notifications.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';
import { UserLogin } from '../models/user.model';

@Component({
  selector: 'app-user-compte',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  providers: [NotificationsComponent],
  templateUrl: './user-compte.component.html',
  styleUrl: './user-compte.component.css'
})
export class UserCompteComponent implements OnInit {
  UserForm !: FormGroup;
  authService = inject(AuthService);
  authenticatedUser!: UserLogin | null;
  constructor(private fb: FormBuilder,@Inject(DOCUMENT) public document: Document) {
    this.UserForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      role: ['', Validators.required]
    });
    }
    
   
    ngOnInit() {
      this.authenticatedUser = this.authService.currentUser();
      if(this.authenticatedUser){
        console.log(this.authenticatedUser.email);
          this.UserForm.patchValue({
            email: this.authenticatedUser.email,
            role: this.authService.currentUserRole()
          });
          
          
  this.UserForm.get('email')?.disable();
  this.UserForm.get('role')?.disable();
        
       
    }
    
  }





}
