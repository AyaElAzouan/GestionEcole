import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-detail-professor',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  providers: [],
  templateUrl: './detail-professor.component.html',
  styleUrl: './detail-professor.component.css'
})
export class DetailProfessorComponent {
  professors = [
    { id: 1, nom: 'Badir', prenom: 'Hassan', email: 'Badir@uae.ac.ma' },
    { id: 2, nom: 'EZZINE', prenom: 'Monsieur', email: 'ezzine@uae.ac.ma' },
    { id: 3, nom: 'Tanana', prenom: 'Madame', email: 'tanana@uae.ac.ma' },
  ];

  
  
  profForm !: FormGroup;
 
  router = inject(Router);
  idT!: number;
  readonly dialog = inject(MatDialog);
  nom: string = '';
  constructor(private route: ActivatedRoute,private fb: FormBuilder,@Inject(DOCUMENT) public document: Document) {
    this.profForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', Validators.required]
    });
    }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    const professor = this.professors.find((prof) => prof.id === Number(id)); 
    if (professor) {
      this.profForm.patchValue(professor); 
      this.nom=professor.nom;
    }
  }
  
 
  
    onSubmit() {
     
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: { idT: this.idT }
    });
  }

}

