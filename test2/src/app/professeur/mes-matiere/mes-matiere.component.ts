import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from '../../models/matière.model';
@Component({
  selector: 'app-mes-matiere',
  standalone: true,
  imports: [CommonModule,MatTooltipModule,FormsModule],
  templateUrl: './mes-matiere.component.html',
  styleUrl: './mes-matiere.component.css'
})
export class MesMatiereComponent {

  constructor(private router: Router) {

  }




  ngOnInit(): void {

  }






//matiere parameters
  matieres: Matiere[] = [];

  filieres = ['GINF1', 'GINF2', 'GINF3'];
  selectedFiliere = 'GINF1';
  filteredMatieres: Matiere[] = [];



  selectFiliere(filiere: string): void {
    this.selectedFiliere = filiere;
    this.filterMatieres();
  }

  filterMatieres(): void {
    this.filteredMatieres = this.matieres.filter(m => m.filiere=== this.selectedFiliere);
  }

  onEdit2(matiere: Matiere): void {
    this.router.navigate(['/mes-etudiants']);
  }


}

