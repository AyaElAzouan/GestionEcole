import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';
import { InscriptionService } from '../../services/inscription.service';
import { MatiereService } from '../../services/matiere.service';
import { Etudiant } from '../../models/etudiant.model';
import { Inscription } from '../../models/inscription.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, NgForOf} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";


@Component({
  selector: 'app-inscription-etu',
  templateUrl: './inscription-etu.component.html',
  imports: [
    CommonModule,
    MatTooltip,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./inscription-etu.component.css'],
  standalone:true
})
export class InscriptionEtuComponent implements OnInit {
  inscriptions: Inscription[] = [];
  filteredInscriptions: Inscription[] = [];
  searchTerm: string = "";
  etudiantId: number | null = null;
  etudiant: Etudiant = {} as Etudiant;

  constructor(
    private inscriptionService: InscriptionService,
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private matiereService:MatiereService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'étudiant depuis l'URL
    this.route.params.subscribe(params => {
      this.etudiantId = +params['id-etudiant']; // Convertir en nombre
      if (this.etudiantId) {
        this.getEtudiantDetails(this.etudiantId);
        this.getInscriptionsByEtudiant(this.etudiantId);
      }
    });
  }

  // Récupérer les inscriptions d'un étudiant spécifique
  getInscriptionsByEtudiant(etudiantId: number): void {
    this.inscriptionService.getInscriptionsByEtudiant(etudiantId).subscribe(data => {
      this.inscriptions = data;
      this.filteredInscriptions = data;

      // Récupérer les détails des modules pour chaque inscription
      this.inscriptions.forEach(inscription => {
        if (inscription.moduleId) {
          this.getModuleDetails(inscription.moduleId);
        }
      });
    });
  }

  getModuleDetails(moduleId: number): void {
    this.matiereService.getMatiereById(moduleId).subscribe(module => {
      this.inscriptions.forEach(inscription => {
        if (inscription.moduleId === moduleId) {
          inscription.module = module;
        }
      });
    });
  }
  // Récupérer les détails de l'étudiant
  getEtudiantDetails(etudiantId: number): void {
    this.etudiantService.getEtudiantById(etudiantId).subscribe(etudiant => {
      this.etudiant = etudiant;
    });
  }

  // Filtrer les inscriptions par terme de recherche
  filtrerInscriptions(): void {
    this.filteredInscriptions = this.inscriptions.filter(inscription =>
      inscription.module?.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      inscription.module?.filiere.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Annuler une inscription
  annulerInscription(moduleId: number): void {
    if (!this.etudiantId) return;

    this.inscriptionService.annulerInscription(this.etudiantId, moduleId).subscribe(() => {
      this.getInscriptionsByEtudiant(this.etudiantId!);
    }, error => {
      console.error("Erreur lors de l'annulation de l'inscription:", error);
    });
  }
}
