import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-2xl mx-auto p-4">
      <form [formGroup]="form" class="space-y-6">
        <div>
          <label for="userType" class="block text-sm font-medium text-gray-700">User Type</label>
          <select 
            id="userType" 
            formControlName="userType"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Type</option>
            <option value="student">Student</option>
            <option value="professor">Professor</option>
          </select>
        </div>

        <div *ngIf="form.get('userType')?.value">
          <label for="selection" class="block text-sm font-medium text-gray-700">
            {{ form.get('userType')?.value === 'student' ? 'Level' : 'Professor' }}
          </label>
          <select 
            id="selection" 
            formControlName="selection"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select {{ form.get('userType')?.value === 'student' ? 'Level' : 'Professor' }}</option>
            <ng-container *ngIf="form.get('userType')?.value === 'student'">
              <option value="AP1">AP1</option>
              <option value="AP2">AP2</option>
              <option value="GINF1">GINF1</option>
              <option value="GINF2">GINF2</option>
            </ng-container>
            <ng-container *ngIf="form.get('userType')?.value === 'professor'">
              <option value="badir">Mr. Badir</option>
              <option value="ezzine">Mr. Ezzine</option>
              <option value="tanana">Mme. Tanana</option>
            </ng-container>
          </select>
        </div>
      </form>
    </div>
  `
})
export class ContactComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      userType: ['', Validators.required],
      selection: ['', Validators.required]
    });

    this.form.get('userType')?.valueChanges.subscribe(() => {
      this.form.patchValue({ selection: '' });
    });
  }
}