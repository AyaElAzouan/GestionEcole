import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ProfesseurService } from '../services/professeur.service';
import { Prof } from '../models/Prof.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-detail-professor',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './detail-professor.component.html',
  styleUrls: ['./detail-professor.component.css']
})
export class DetailProfessorComponent {
  id!: number;
  profForm!: FormGroup;
  router = inject(Router);
  dialog = inject(MatDialog);
  nom: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject(DOCUMENT) public document: Document,
    private profService: ProfesseurService
  ) {
    this.profForm = this.fb.group({
      cin: ['', Validators.required],
      code: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      numTele: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required], // Ajout du champ password
      role: ['PROFESSEUR'], // Rôle par défaut
      matieres: [[]] // Liste des matières
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.profService.getProfById(this.id).subscribe(
        (prof: Prof) => {
          if (prof) {
            // Mise à jour du formulaire avec les données récupérées
            this.profForm.patchValue({
              cin: prof.cin,
              code: prof.code,
              nom: prof.nom,
              prenom: prof.prenom,
              adresse: prof.adresse,
              numTele: prof.numTele,
              email: prof.user?.email || '', // Vérifier si l'objet user est défini
            });
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération du professeur:', error);
        }
      );
    }
  }

  // Logique de soumission du formulaire
  onSubmit(): void {
    if (this.profForm.valid) {
      const updatedProf = {
        cin: this.profForm.value.cin,
        code: this.profForm.value.code,
        nom: this.profForm.value.nom,
        prenom: this.profForm.value.prenom,
        adresse: this.profForm.value.adresse,
        numTele: this.profForm.value.numTele,
        matieres: this.profForm.value.matieres, // Liste des matières
        user: {
          email: this.profForm.value.email,
          password: this.profForm.value.password,
          role: this.profForm.value.role
        }
      };

      this.profService.updateProf(this.id, updatedProf).subscribe(
        (response) => {
          console.log('Professeur mis à jour avec succès', response);
          this.router.navigate(['/gestion-prof']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du professeur', error);
        }
      );
    }
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      data: { idT: this.id }
    });
  }
  onCancel():void{
    this.router.navigate(['/gestion-prof']);
  }
}
