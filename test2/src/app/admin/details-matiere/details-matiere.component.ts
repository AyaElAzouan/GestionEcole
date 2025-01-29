import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { Matiere } from '../../models/matière.model';


@Component({
  selector: 'app-details-matiere',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './details-matiere.component.html',
  styleUrl: './details-matiere.component.css'
})
export class DetailsMatiereComponent {

  etudiants = [
    { id: 1, nom: 'akiirne', prenom: 'amal', email: 'akiirne@uae.ac.ma' },
    { id: 2, nom: 'amh', prenom: 'wiam', email: 'amh@uae.ac.ma' },
    { id: 3, nom: 'azouane', prenom: 'aya', email: 'azouane@uae.ac.ma' }
  ];
  matieres: Matiere[] = [
     { id: 1, nom: 'Maths pour l ingénieur', responsable: 'Dr. Ahmed', volume_horaire: 40, filière:'GINF1' },
     { id: 2, nom: 'Electronique', responsable: 'Prof. Houda', volume_horaire: 35, filière:'GINF1' },
     { id: 3, nom: 'Computer Science', responsable: 'Dr. Alami', volume_horaire: 45, filière:'GINF1' },
     { id: 4, nom: 'Programmation', responsable: 'Prof. Drissi', volume_horaire: 30 , filière:'GINF1'},
     { id: 5, nom: 'Bases de données & Réseaux', responsable: 'Dr. Badir', volume_horaire: 38, filière:'GINF1' },
     { id: 6, nom: 'Signal', responsable: 'Prof. Massou', volume_horaire: 28,filière: 'GINF1'},
 
     { id: 1, nom: 'Programmation Orientée Objet & XMLr', responsable: 'Dr. Ahmed', volume_horaire: 40, filière:'GINF2' },
     { id: 2, nom: 'Qualité & approche processus', responsable: 'Prof. Houda', volume_horaire: 35, filière:'GINF2' },
     { id: 3, nom: 'Modélisation orientée objet et IHM', responsable: 'Dr. Alami', volume_horaire: 45, filière:'GINF2' },
     { id: 4, nom: 'Bases de données avancées I', responsable: 'Prof. Drissi', volume_horaire: 30 , filière:'GINF2'},
     
 
 
     { id: 1, nom: 'AI avancé', responsable: 'Dr. Ahmed', volume_horaire: 40, filière:'GINF3' },
     { id: 2, nom: 'Data WAREHOUSE', responsable: 'Prof. Badir', volume_horaire: 35, filière:'GINF3' },
     { id: 3, nom: 'Data Mining', responsable: 'Dr. Badir', volume_horaire: 45, filière:'GINF3' },
     { id: 4, nom: 'Programmation', responsable: 'Prof. Drissi', volume_horaire: 30 , filière:'GINF3'},
     { id: 5, nom: 'E-commerce', responsable: 'Dr. xxx', volume_horaire: 38, filière:'GINF3' },
     { id: 6, nom: 'dev Mobile', responsable: 'Prof. AZIYAT', volume_horaire: 28,filière: 'GINF3'},
   ];
 

 

  
  matiereForm !: FormGroup;
  router = inject(Router);
  idT!: number;
  readonly dialog = inject(MatDialog);
  nom: string = '';
  constructor(private route: ActivatedRoute,private fb: FormBuilder,@Inject(DOCUMENT) public document: Document) {
    this.matiereForm = this.fb.group({
    nom: ['', Validators.required],
    responsable: ['', Validators.required],
    volume_horaire: ['', Validators.required],
    filière: ['', Validators.required]
    });
    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    const matiere = this.matieres.find((matier) => matier.id === Number(id)); 
    if (matiere) {
      this.matiereForm.patchValue(matiere); 
      this.nom=matiere.nom;
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



