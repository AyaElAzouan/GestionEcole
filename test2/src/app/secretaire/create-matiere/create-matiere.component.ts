import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Professor } from '../../models/Professor.model';
import {MatiereService} from "../../services/matiere.service";
import {Prof} from "../../models/Prof.model";
import {ProfesseurService} from "../../services/professeur.service";

@Component({
  selector: 'app-create-matiere',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './create-matiere.component.html',
  styleUrl: './create-matiere.component.css'
})
export class CreateMatiereComponent {

listProf:Prof[] | undefined;
  matForm !: FormGroup;

  idT!: number;
  readonly dialog = inject(MatDialog);
  nom: string = '';
  constructor(private route: ActivatedRoute,private fb: FormBuilder,
              @Inject(DOCUMENT) public document: Document,
              private matiereService: MatiereService,
              private profService:ProfesseurService,
              private router:Router) {
    this.matForm = this.fb.group({
    nom: ['', Validators.required],
      nbrHeure: [''],
      filiere:['', Validators.required],
      profId:['']
    });
    }
  ngOnInit(): void {
    this.chargerProfs();


  }



  onSubmit() {
    if (this.matForm.valid) {
      const matiere = this.matForm.value;

      if (!matiere.profId) {
        matiere.profId = null; // Si aucun professeur n'est sélectionné
      }

      // Étape 1 : Création de la matière
      this.matiereService.addMatiere(matiere).subscribe(
        (response) => {
          console.log('Matière ajoutée avec succès:', response);
          const matiereId = response.id;
          const profId = matiere.profId;

          if (profId) {
            // Étape 2 : Assigner le professeur à la matière
            this.matiereService.assignerProfesseur(matiereId, profId).subscribe(
              () => {
                console.log('Professeur assigné avec succès');

              },
              (error) => {
                console.error("Erreur lors de l'assignation du professeur:", error);
              }
            );
            // Étape 3 : Ajouter la matière au professeur
            this.profService.addMatiereToProfesseur(profId, matiereId).subscribe(
              () => {
                console.log('Matière ajoutée au professeur avec succès');
                this.router.navigate(['/gestion-matiere']);
              },
              (error) => {
                console.error("Erreur lors de l'ajout de la matière au professeur:", error);

              }
            );
            this.router.navigate(['/gestion-matiere']);
          }
        },
        (error) => {
          console.error("Erreur lors de l'ajout de la matière:", error);
        }
      );
    } else {
      console.error('Formulaire invalide');
    }
  }

  // Fonction pour assigner un professeur à une matière
  assignerProfesseur(profId: number, matiereId: number): void {
    this.matiereService.assignerProfesseur(matiereId, profId).subscribe(
      () => {
        console.log('Professeur assigné avec succès');


      },
      (error) => {
        console.error('Erreur lors de l\'assignation du professeur:', error);

      }
    );

  }
  chargerProfs(): void {
    this.profService.getProfs().subscribe(
      (data: Prof[]) => {
        this.listProf = data || []; // Évite une erreur si data est null
      },
      (error) => {
        console.error(' Erreur lors du chargement des professeurs :', error);
      }
    );
  }
  onCancel(): void {
    this.matForm.reset();
    this.router.navigate(['/gestion-matiere']);

  }


}



