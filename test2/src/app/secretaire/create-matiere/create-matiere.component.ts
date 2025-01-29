import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Professor } from '../../models/Professor.model';

@Component({
  selector: 'app-create-matiere',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './create-matiere.component.html',
  styleUrl: './create-matiere.component.css'
})
export class CreateMatiereComponent {

listProf:Professor[] | undefined;
  matForm !: FormGroup;
 
  router = inject(Router);
  idT!: number;
  readonly dialog = inject(MatDialog);
  nom: string = '';
  constructor(private route: ActivatedRoute,private fb: FormBuilder,@Inject(DOCUMENT) public document: Document) {
    this.matForm = this.fb.group({
    nom: ['', Validators.required],
    responsable: ['', Validators.required],
    volume: ['', Validators.required],
    });
    }
  ngOnInit(): void {
   
    
  }
  
 
  
    onSubmit() {
     
  }

  

}



