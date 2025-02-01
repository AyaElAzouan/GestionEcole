import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from "../../services/inscription.service";
import { MatiereService } from "../../services/matiere.service";
import { EtudiantService } from "../../services/etudiant.service";
import { Inscription } from "../../models/inscription.model";
import { Matiere } from "../../models/matière.model";
import { Etudiant } from "../../models/etudiant.model";
import {MatTooltip} from "@angular/material/tooltip";
import {CommonModule, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-inscription-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltip,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './inscription-list.component.html',
  styleUrls: ['./inscription-list.component.css']
})
export class InscriptionListComponent implements OnInit {
  inscriptions: Inscription[] = [];
  filteredInscriptions: Inscription[] = [];
  searchTerm: string = "";
  selectedMatiereId: string = "";
  matieresDistinctes: { id: number, nom: string }[] = [];
  etudiantId: number | null = null;

  constructor(
    private inscriptionService: InscriptionService,
    private matiereService: MatiereService,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute  // Injecter ActivatedRoute pour lire les paramètres de l'URL
  ) { }

  ngOnInit(): void {
    // Récupérer l'id-etudiant depuis l'URL
    this.route.params.subscribe(params => {
      this.etudiantId = +params['id-etudiant'];  // Convertir en nombre
      if (this.etudiantId) {
        // Si un ID d'étudiant est présent, récupérer ses inscriptions
        this.getInscriptionsByEtudiant(this.etudiantId);
      } else {
        // Sinon, récupérer toutes les inscriptions
        this.getAllInscriptions();
      }
    });

    this.getMatieresDistinctes(); // Charger les matières distinctes
  }

  // Récupérer toutes les inscriptions et les détails des étudiants et des modules
  getAllInscriptions(): void {
    this.inscriptionService.getAllInscriptions().subscribe(data => {
      this.inscriptions = data;
      this.filteredInscriptions = data;
      this.loadEtudiantAndModuleDetails();
    });
  }

  // Récupérer les inscriptions pour un étudiant spécifique
  getInscriptionsByEtudiant(etudiantId: number): void {
    this.inscriptionService.getInscriptionsByEtudiant(etudiantId).subscribe(data => {
      this.inscriptions = data;
      this.filteredInscriptions = data;
      this.loadEtudiantAndModuleDetails();
    });
  }

  // Récupérer les matières distinctes (sans doublons)
  getMatieresDistinctes(): void {
    this.matiereService.getMatieres().subscribe(data => {
      const uniqueMatieres = new Map<number, string>();
      data.forEach(matiere => {
        if (!uniqueMatieres.has(matiere.id)) {
          uniqueMatieres.set(matiere.id, matiere.nom);
        }
      });
      this.matieresDistinctes = Array.from(uniqueMatieres, ([id, nom]) => ({ id, nom }));
    });
  }

  // Charger les détails des étudiants et des modules pour chaque inscription
  loadEtudiantAndModuleDetails(): void {
    this.inscriptions.forEach(inscription => {
      this.getEtudiantDetails(inscription.etudiantId);
      this.getModuleDetails(inscription.moduleId);
    });
  }

  // Récupérer les détails de l'étudiant par son ID
  getEtudiantDetails(etudiantId: number): void {
    this.etudiantService.getEtudiantById(etudiantId).subscribe(etudiant => {
      this.inscriptions.forEach(inscription => {
        if (inscription.etudiantId === etudiantId) {
          inscription.etudiant = etudiant;
        }
      });
    });
  }

  // Récupérer les détails du module par son ID
  getModuleDetails(moduleId: number): void {
    this.matiereService.getMatiereById(moduleId).subscribe(module => {
      this.inscriptions.forEach(inscription => {
        if (inscription.moduleId === moduleId) {
          inscription.module = module;
        }
      });
    });
  }

  // Annuler une inscription
  annulerInscription(etudiantId: number, matiereId: number): void {
    this.inscriptionService.annulerInscription(etudiantId, matiereId).subscribe({
      next: () => {
        this.getAllInscriptions();
      },
      error: (err) => {
        console.error('Erreur lors de l\'annulation de l\'inscription:', err);
      }
    });
  }

  // Filtrer les inscriptions par matière et/ou par nom d'étudiant
  filtrerInscriptions() {
    // Si une matière est sélectionnée, filtrez les inscriptions en fonction de la matière
    if (this.selectedMatiereId) {
      this.filteredInscriptions = this.inscriptions.filter(inscription => {
        const correspondMatiere = inscription.module?.id === +this.selectedMatiereId;
        const correspondNom = this.searchTerm
          ? inscription.etudiant?.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          inscription.etudiant?.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          inscription.etudiant?.cne.includes(this.searchTerm)
          : true;

        return correspondMatiere && correspondNom;
      });
    } else {
      // Si aucune matière n'est sélectionnée, filtrez uniquement par le nom de l'étudiant ou le CNE
      this.filteredInscriptions = this.inscriptions.filter(inscription => {
        const correspondNom = this.searchTerm
          ? inscription.etudiant?.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          inscription.etudiant?.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          inscription.etudiant?.cne.includes(this.searchTerm)
          : true;
        return correspondNom;
      });
    }
  }
}
