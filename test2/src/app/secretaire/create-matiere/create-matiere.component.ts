import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Professor } from '../../models/Professor.model';
import {MatiereService} from "../../services/matiere.service";

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

  idT!: number;
  readonly dialog = inject(MatDialog);
  nom: string = '';
  constructor(private route: ActivatedRoute,private fb: FormBuilder,@Inject(DOCUMENT) public document: Document,
              private matiereService: MatiereService,
              private router:Router) {
    this.matForm = this.fb.group({
    nom: ['', Validators.required],
      nbrHeure: [''],
      filiere:['', Validators.required],
      profId:['']
    });
    }
  ngOnInit(): void {


  }



    onSubmit() {
      if (this.matForm.valid) {

        const matiere = this.matForm.value;
        this.matiereService.addMatiere(matiere).subscribe(
          (response) => {
            console.log('Matière ajouté avec succès:', response);

            this.router.navigate(['/gestion-matiere']);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la matière:', error);
          }
        );
      } else {
        console.log('Formulaire invalide');
      }

  }
  onCancel(): void {
    this.matForm.reset();
    this.router.navigate(['/gestion-matiere']);

  }


}



