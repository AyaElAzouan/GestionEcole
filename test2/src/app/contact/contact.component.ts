import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserType, StudentLevel, Professor } from '../models/form.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  userTypes: UserType[] = [
    { value: 'student', label: 'Student' },
    { value: 'professor', label: 'Professor' }
  ];

  studentLevels: StudentLevel[] = [
    { value: 'AP1', label: 'AP1' },
    { value: 'AP2', label: 'AP2' },
    { value: 'GINF1', label: 'GINF1' },
    { value: 'GINF2', label: 'GINF2' }
  ];

  professors: Professor[] = [
    { value: 'badir', label: 'Mr. Badir' },
    { value: 'ezzine', label: 'Mr. Ezzine' },
    { value: 'tanana', label: 'Mme. Tanana' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
      selection: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Listen to userType changes to update selection options
    this.contactForm.get('userType')?.valueChanges.subscribe(value => {
      this.contactForm.patchValue({ selection: '' });
    });
  }

  get selectionOptions() {
    const userType = this.contactForm.get('userType')?.value;
    return userType === 'student' ? this.studentLevels : this.professors;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.contactForm.reset();
      this.submitted = false;
    }
  }
}