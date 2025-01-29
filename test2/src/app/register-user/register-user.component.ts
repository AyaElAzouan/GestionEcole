import { Component ,Inject,inject,OnInit} from '@angular/core';
import { RouterOutlet ,Router, RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import {FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { matchPasswordValidator } from '../validators/match-password.validator'; 
@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule, MatSelectModule],
  providers: [NotificationsComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit{
  selected = 'Professeur';
  registerForm !: FormGroup;

  authService = inject(AuthService);
  router = inject(Router);
  imageBase64 !: string;
 


  constructor(private fb: FormBuilder,@Inject(DOCUMENT) public document: Document) {
    this.registerForm = this.fb.group({
    role: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    image :  [''],
    confirmPassword: ['', [Validators.required]]
    }, {
      // Validation pour vérifier que les mots de passe correspondent
      validators: [matchPasswordValidator('password', 'confirmPassword')]
    });
    }
  ngOnInit(): void {}
  


 
   
  register(){
   
  }
   
  previewImage(event: Event) {
    const imagePreview = this.document.getElementById('imagea') as HTMLImageElement;
    const cardImage = this.document.getElementById('cardImage') as HTMLImageElement;
    const imageDataInput = this.document.getElementById('imageData') as HTMLInputElement;
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const base64Image = result.split(',')[1]; 
          this.imageBase64 = base64Image;
        }
      
        const imageSrc = e.target?.result as string;
        imagePreview.src = imageSrc;
        imagePreview.style.display = 'block';
        cardImage.src = imageSrc;
        
        if (imageDataInput) {
          imageDataInput.value = imageSrc;
        }
      };

      reader.readAsDataURL(file);
    }
  }
  
    
}







