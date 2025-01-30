import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import {EtudiantService} from "../../services/etudiant.service";

@Component({
  selector: 'app-create-etu',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './create-etu.component.html',
  styleUrl: './create-etu.component.css'
})
export class CreateEtuComponent {

  etudiantForm!: FormGroup;

  idT!: number;
  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject(DOCUMENT) public document: Document,
    private etudiantService: EtudiantService,
    private router: Router
  ) {
    // Initialisation du formulaire avec un seul étudiant
    this.etudiantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],  // Ajout de la validation pour l'email
      cin: ['', Validators.required],
      cne: ['', Validators.required],
      adresse: ['', Validators.required],
      numTele: ['', Validators.required],
      dateNAissance: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.etudiantForm.valid) {

      const etudiant = this.etudiantForm.value;
      // Convertir la date de naissance en un objet Date
      if (etudiant.dateNAissance) {
        etudiant.dateNAissance = new Date(etudiant.dateNAissance); // Transformation en objet Date
      }


      this.etudiantService.addEtudiant(etudiant).subscribe(
        (response) => {
          console.log('Étudiant ajouté avec succès:', response);
          // Assurez-vous que la redirection se fait bien après la réponse
          this.router.navigate(['/gestion-etu']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
  onCancel(): void {
    this.etudiantForm.reset();
    this.router.navigate(['/gestion-etu']);
  }


}


