import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Matiere } from '../../models/matière.model';
import { MatiereService } from "../../services/matiere.service";
import {ProfesseurService} from "../../services/professeur.service";
import {Prof} from "../../models/Prof.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-gestion-matiere',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, FormsModule],
  templateUrl: './gestion-matiere.component.html',
  styleUrls: ['./gestion-matiere.component.css']
})
export class GestionMatiereComponent implements OnInit {
  listProf: Prof[] = []; // Liste des professeurs
  matieres: Matiere[] = [];
  filieres: string[] = [];
  selectedFiliere: string = ''; // Filière sélectionnée
  filteredMatieres: Matiere[] = [];

  constructor(private router: Router, private matiereService: MatiereService,
              private profService:ProfesseurService) {}

  ngOnInit(): void {
    this.chargerFilieres();
    this.chargerMatieres();
    this.chargerProfs();
  }

  chargerMatieres(): void {
    this.matiereService.getMatieres().subscribe(
      (data: Matiere[]) => {
        this.matieres = data || []; // Évite les erreurs si data est null
        this.filteredMatieres = [...this.matieres]; // Copie pour le filtrage
      },
      (error) => {
        console.error(' Erreur lors du chargement des matières:', error);
      }
    );
  }

  chargerFilieres(): void {
    this.matiereService.getMatieres().subscribe(
      (data) => {
        // Extraire les filières uniques
        this.filieres =  ["Afficher tout", ...new Set(data.map(m => m.filiere))];
        console.log('Filières après traitement :', this.filieres);
      },
      (error) => {
        console.error('Erreur lors du chargement des filières', error);
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

  selectFiliere(filiere: string): void {
    if (filiere === "Afficher tout") {
      this.selectedFiliere = '';
      this.filteredMatieres = this.matieres; // Afficher toutes les matières
    } else {
      this.selectedFiliere = filiere;
      this.filterMatieres(); // Filtrer les matières par filière
    }
  }

  filterMatieres(): void {
    this.filteredMatieres = this.matieres.filter(m => m.filiere === this.selectedFiliere);
  }

  onEdit2(matiere: Matiere): void {
    this.router.navigate(['/detail-matiere', matiere.id]);
  }
  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette matière?')) {
      this.matiereService.deleteMatiere(id).subscribe(() => {
        // Recharger les matières après suppression
        this.chargerMatieres();
      });
    }
  }
  openAddMatiereForm():void{
    this.router.navigate(['/create-matiere']);
  }
  getProfName(profId: number): Observable<Prof> {
    return this.profService.getProfById(profId);
  }

}
