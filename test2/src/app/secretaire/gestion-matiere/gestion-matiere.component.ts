import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from '../../models/matière.model';
@Component({
  selector: 'app-gestion-matiere',
  standalone: true,
  imports: [CommonModule,MatTooltipModule,FormsModule],
  templateUrl: './gestion-matiere.component.html',
  styleUrl: './gestion-matiere.component.css'
})
export class GestionMatiereComponent {

 constructor(private router: Router) {
    this.filterMatieres();
  }

  

  
  ngOnInit(): void {

  }

  
  

  

//matiere parameters
  matieres: Matiere[] = [
    { id: 1, nom: 'Maths pour l ingénieur', responsable: 'Dr. Ahmed', volume_horaire: 40, filière:'GINF1' },
    { id: 2, nom: 'Electronique', responsable: 'Prof. Houda', volume_horaire: 35, filière:'GINF1' },
    { id: 3, nom: 'Computer Science', responsable: 'Dr. Alami', volume_horaire: 45, filière:'GINF1' },
    { id: 4, nom: 'Programmation', responsable: 'Prof. Drissi', volume_horaire: 30 , filière:'GINF1'},
    { id: 5, nom: 'Bases de données & Réseaux', responsable: 'Dr. Badir', volume_horaire: 38, filière:'GINF1' },
    { id: 6, nom: 'Signal', responsable: 'Prof. Massou', volume_horaire: 28,filière: 'GINF1'},

    { id: 1, nom: 'Programmation Orientée Objet & XMLr', responsable: 'Dr. Ahmed', volume_horaire: 40, filière:'GINF2' },
    { id: 2, nom: 'Qualité & approche processus', responsable: 'Prof. Houda', volume_horaire: 35, filière:'GINF2' },
    { id: 3, nom: 'Modélisation orientée objet et IHM', responsable: 'Dr. Alami', volume_horaire: 45, filière:'GINF2' },
    { id: 4, nom: 'Bases de données avancées I', responsable: 'Prof. Drissi', volume_horaire: 30 , filière:'GINF2'},
    


    { id: 1, nom: 'AI avancé', responsable: 'Dr. Ahmed', volume_horaire: 40, filière:'GINF3' },
    { id: 2, nom: 'Data WAREHOUSE', responsable: 'Prof. Badir', volume_horaire: 35, filière:'GINF3' },
    { id: 3, nom: 'Data Mining', responsable: 'Dr. Badir', volume_horaire: 45, filière:'GINF3' },
    { id: 4, nom: 'Programmation', responsable: 'Prof. Drissi', volume_horaire: 30 , filière:'GINF3'},
    { id: 5, nom: 'E-commerce', responsable: 'Dr. xxx', volume_horaire: 38, filière:'GINF3' },
    { id: 6, nom: 'dev Mobile', responsable: 'Prof. AZIYAT', volume_horaire: 28,filière: 'GINF3'},
  ];

  filieres = ['GINF1', 'GINF2', 'GINF3'];
  selectedFiliere = 'GINF1';
  filteredMatieres: Matiere[] = [];

 

  selectFiliere(filiere: string): void {
    this.selectedFiliere = filiere;
    this.filterMatieres();
  }

  filterMatieres(): void {
    this.filteredMatieres = this.matieres.filter(m => m.filière === this.selectedFiliere);
  }

  onEdit2(matiere: Matiere): void {
    this.router.navigate(['/detail-matiere', matiere.id]);
  }

}

