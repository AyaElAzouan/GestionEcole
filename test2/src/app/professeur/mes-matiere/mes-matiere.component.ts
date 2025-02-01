import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from '../../models/matière.model';

@Component({
  selector: 'app-mes-matiere',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, FormsModule],
  templateUrl: './mes-matiere.component.html',
  styleUrls: ['./mes-matiere.component.css']
})
export class MesMatiereComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initializeMatieres();
  }

  // Matiere parameters
  matieres: Matiere[] = [];
  filieres = ['GINF1', 'GINF2', 'GINF3'];
  selectedFiliere = 'GINF1';
  filteredMatieres: Matiere[] = [];

  // Static data for testing
  initializeMatieres(): void {
    this.matieres = [
      { id: 1, nom: 'Mathématiques', filiere: 'GINF1', nbrHeure: 30, profId: 101 },
      { id: 2, nom: 'Informatique', filiere: 'GINF1', nbrHeure: 40, profId: 102 },
      { id: 3, nom: 'Reseau', filiere: 'GINF2', nbrHeure: 35, profId: 103 },
      { id: 4, nom: 'Cyber', filiere: 'GINF3', nbrHeure: 25, profId: 104 }
    ];
    this.filterMatieres(); // Filter the matieres based on selected filiere
  }
  selectFiliere(filiere: string): void {
    this.selectedFiliere = filiere;
    this.filterMatieres();
  }

  filterMatieres(): void {
    this.filteredMatieres = this.matieres.filter(m => m.filiere === this.selectedFiliere);
  }

  onEdit2(matiere: Matiere): void {
    this.router.navigate(['/mes-etudiants']);
  }

}
