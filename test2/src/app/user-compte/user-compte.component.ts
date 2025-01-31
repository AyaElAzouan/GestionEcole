import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { NotificationsComponent } from '../notifications/notifications.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';
import { UserLogin } from '../models/user.model';
import { ProfService } from '../services/prof/prof.service';

@Component({
  selector: 'app-user-compte',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  providers: [NotificationsComponent],
  templateUrl: './user-compte.component.html',
  styleUrl: './user-compte.component.css'
})
export class UserCompteComponent implements OnInit {
  role!: string;
  UserForm !: FormGroup;
  ProfForm !: FormGroup;
  authService = inject(AuthService);
  authenticatedUser!: UserLogin | null;
  constructor(private fb: FormBuilder,@Inject(DOCUMENT) public document: Document,private proService :ProfService ) {
    this.ProfForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      numTele: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      role: ['', Validators.required]
    });
    this.UserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
    }
    
   
    ngOnInit() {
      this.role = this.authService.currentUserRole() ?? '';
      if(this.role=='ADMIN'||this.role=='SECRAITAIRE'){
      this.authenticatedUser = this.authService.currentUser();
      if(this.authenticatedUser){
        console.log(this.authenticatedUser.email);
          this.UserForm.patchValue({
            email: this.authenticatedUser.email,
            role: this.authService.currentUserRole()
          });
                 
       this.UserForm.get('role')?.disable();   
    }
  }else if(this.role=='PROFESSEUR'){
    this.proService.getProfesseurById(Number(this.authService.getUserId())).subscribe(
      (data) => {
        console.log(data);
        this.ProfForm.patchValue({
          email: data.email,
          nom: data.nom,
          prenom : data.prenom,
          adresse: data.adresse,
          numTele: data.numTele

        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
 
  }

  onSubmit(){

  }



}
