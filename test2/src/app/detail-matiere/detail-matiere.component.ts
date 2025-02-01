import { Component, Inject, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationsComponent } from '../notifications/notifications.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatiereService } from "../services/matiere.service";
import { Matiere } from '../models/matière.model';
import {Prof} from "../models/Prof.model";
import {ProfesseurService} from "../services/professeur.service";

@Component({
  selector: 'app-detail-matiere',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  providers: [NotificationsComponent],
  templateUrl: './detail-matiere.component.html',
  styleUrls: ['./detail-matiere.component.css'] // ✅ Correction ici
})
export class DetailMatiereComponent implements OnInit {
  listProf: Prof[]=[]; // ✅ Initialisation correcte
  id!: number;
  matiereForm!: FormGroup;
  private notifComponent = inject(NotificationsComponent);
  router = inject(Router);
  readonly dialog = inject(MatDialog);
  nom: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject(DOCUMENT) public document: Document,
    private matiereService: MatiereService,
    private profService:ProfesseurService
  ) {
    this.matiereForm = this.fb.group({
      nom: ['', Validators.required],
      profId: [''],
      nbrHeure: ['', Validators.required],
      filiere: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam; // Convertir l'id en
      this.chargerProfs();
      this.matiereService.getMatiereById(this.id).subscribe(
        (matiere: Matiere) => {
          if (matiere) {
            this.matiereForm.patchValue(matiere);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la matière:', error);
        }
      );
    }

  }

  onSubmit() {
    if (this.matiereForm.valid) {

      const matiereData = this.matiereForm.value;
      console.log("Données du formulaire:", matiereData);
      if (!matiereData.profId) {
        // Si profId est vide, on peut ne pas envoyer ce champ ou l'assigner à null
        matiereData.profId = null;
      }

      this.matiereService.updateMatiere(this.id, matiereData).subscribe(
        () => {
          this.notifComponent.showNotification('Matière mise à jour avec succès !', 'success');
          this.router.navigate(['/gestion-matiere']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la matière:', error);
        }
      );
      // L'ID du professeur choisi dans le formulaire
      const profId = matiereData.profId;

      // Envoi de la requête pour assigner un professeur à la matière
      this.matiereService.assignerProfesseur(this.id, profId).subscribe(
        () => {
          this.notifComponent.showNotification('Matière mise à jour avec succès !', 'success');
          this.router.navigate(['/gestion-matiere']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la matière:', error);
        }
      );
      this.profService.addMatiereToProfesseur(profId, this.id).subscribe(
        () => {
          this.notifComponent.showNotification('Matière ajoutée au professeur !', 'success');

        },
        (error) => {
          console.error("Erreur lors de l'ajout de la matière au professeur:", error);
        }
      );

    }
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

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: { idT: this.id }
    });
  }
  onCancel():void{
    this.router.navigate(['/gestion-matiere']);
  }
}
