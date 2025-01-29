import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-etu',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './create-etu.component.html',
  styleUrl: './create-etu.component.css'
})
export class CreateEtuComponent {

 
  profForm !: FormGroup;
 
  router = inject(Router);
  idT!: number;
  readonly dialog = inject(MatDialog);
  nom: string = '';
  constructor(private route: ActivatedRoute,private fb: FormBuilder,@Inject(DOCUMENT) public document: Document) {
    this.profForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', Validators.required],
    cin: ['', Validators.required],
    cne: ['', Validators.required],
    adresse: ['', Validators.required],
    numTele: ['', Validators.required],
    naissance_date: ['', Validators.required],
    });
    }
  ngOnInit(): void {
   
    
  }
  
 
  
    onSubmit() {
     
  }

  

}


