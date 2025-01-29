import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { Etudiant } from "../../models/etudiant.model";
import { EtudiantService } from "../../services/etudiant.service";

@Component({
  selector: 'app-detail-etu',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './detail-etu.component.html',
  styleUrls: ['./detail-etu.component.css']
})
export class DetailEtuComponent {

  id!: number;
  etuForm!: FormGroup;
  idT!: number;
  readonly dialog = inject(MatDialog);
  nom: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject(DOCUMENT) public document: Document,
    private router: Router,
    private etudiantService: EtudiantService
  ) {
    this.etuForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      cin: ['', Validators.required],
      cne: ['', Validators.required],
      adresse: ['', Validators.required],
      numTele: ['', Validators.required],
      naissance_date: [, Validators.required] // date picker input
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam; // Convertir l'id en nombre
      this.etudiantService.getEtudiantById(this.id).subscribe(
        (etudiant) => {
          if (etudiant) {
            // Format la date de naissance au format 'YYYY-MM-DD' pour le champ date
            const formattedDate = this.formatDate(etudiant.dateNAissance);
            this.etuForm.patchValue({
              ...etudiant,
              naissance_date: formattedDate // Pré-remplir le champ avec la date formatée
            });
            this.nom = etudiant.nom;
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'étudiant:', error);
        }
      );
    }
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    return `${year}-${month}-${day}`; // Format 'YYYY-MM-DD'
  }

  onSubmit(): void {
    if (this.etuForm.valid) {
      const updatedEtudiant = this.etuForm.value;
      // Convertir la date de naissance en un objet Date (si nécessaire)
      if (updatedEtudiant.naissance_date) {
        updatedEtudiant.dateNAissance = new Date(updatedEtudiant.naissance_date);
      }
      this.etudiantService.updateEtudiant(this.id, updatedEtudiant).subscribe(
        (response) => {
          console.log('Étudiant mis à jour avec succès:', response);
          this.router.navigate(['/gestion-etu']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'étudiant:', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: { idT: this.idT }
    });
  }
}
