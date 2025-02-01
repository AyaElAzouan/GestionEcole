import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { DOCUMENT, NgForOf } from "@angular/common";
import { Matiere } from "../../models/matière.model";
import { Etudiant } from "../../models/etudiant.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatiereService } from "../../services/matiere.service";
import { EtudiantService } from "../../services/etudiant.service";
import { InscriptionService } from "../../services/inscription.service";
import { Inscription } from "../../models/inscription.model";

@Component({
  selector: 'app-inscription-ajout',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './inscription-ajout.component.html',
  styleUrls: ['./inscription-ajout.component.css']
})
export class InscriptionAjoutComponent implements OnInit {
  InscForm!: FormGroup;
  listMatiere: Matiere[] = [];
  listEtudiants: Etudiant[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject(DOCUMENT) public document: Document,
    private matiereService: MatiereService,
    private etudiantService: EtudiantService,
    private inscriptionService: InscriptionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.InscForm = this.fb.group({
      etudiantId: ['', Validators.required],
      moduleId: ['', Validators.required],
    });

    this.getMatiereList();
    this.getEtudiantsList();
  }

  getMatiereList() {
    this.matiereService.getMatieres().subscribe({
      next: (data) => this.listMatiere = data,
      error: (err) => console.error("Erreur lors du chargement des matières :", err)
    });
  }

  getEtudiantsList() {
    this.etudiantService.getEtudiants().subscribe({
      next: (data) => this.listEtudiants = data,
      error: (err) => console.error("Erreur lors du chargement des étudiants :", err)
    });
  }

  onSubmit() {
    if (this.InscForm.valid) {
      const inscriptionData = this.InscForm.value;

      // Ajouter la date actuelle si elle n'est pas définie
      inscriptionData.dateInscription = new Date().toISOString().split('T')[0];

      const inscription = new Inscription(
        inscriptionData.etudiantId,
        inscriptionData.moduleId,
        new Date(inscriptionData.dateInscription)
      );

      this.inscriptionService.addInscription(inscription).subscribe(
        (response) => {
          console.log('Inscription Créée:', response);
          this.router.navigate(['/list-inscription']);
        },
        (error) => {
          console.error('Erreur:', error);
        }
      );
    }
  }

  onCancel() {
    this.InscForm.reset();
  }
}
