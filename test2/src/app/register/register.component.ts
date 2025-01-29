import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserRole } from '../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  selectedRole: UserRole | null = null;
  adminForm: FormGroup;
  secretaireForm: FormGroup;
  profForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize all forms
    this.adminForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      adminCode: ['', [Validators.required]]
    });

    this.secretaireForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      department: ['', [Validators.required]]
    });

    this.profForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      subject: ['', [Validators.required]],
      yearsOfExperience: ['', [Validators.required, Validators.min(0)]]
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
    switch (this.selectedRole) {
      case 'admin':
        currentForm = this.adminForm;
        break;
      case 'secretaire':
        currentForm = this.secretaireForm;
        break;
      case 'prof':
        currentForm = this.profForm;
        break;
      default:
        return;
    }

    if (currentForm.valid) {
      console.log('Form submitted:', {
        role: this.selectedRole,
        data: currentForm.value
      });
      // Here you would typically call your authentication service
      // to register the user
    } else {
      Object.keys(currentForm.controls).forEach(key => {
        const control = currentForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
