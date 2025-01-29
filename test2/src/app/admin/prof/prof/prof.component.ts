import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from '../../../models/Professor.model';
import { Matiere } from '../../../models/matière.model';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-prof',
  standalone: true,
  imports: [MatTooltipModule,CommonModule,FormsModule],
  templateUrl: './prof.component.html',
  styleUrl: './prof.component.css'
})
export class ProfComponent {

  constructor(private router: Router) {
   
  }

  filteredProfessors: Professor[] = [];
  filterText: string = '';

  professors = [
    { id: 1, nom: 'Badir', prenom: 'Hassan', email: 'Badir@uae.ac.ma' },
    { id: 2, nom: 'EZZINE', prenom: 'Monsieur', email: 'ezzine@uae.ac.ma' },
    { id: 3, nom: 'Tanana', prenom: 'Madame', email: 'tanana@uae.ac.ma' }
  ];
  ngOnInit(): void {
    this.filteredProfessors = [...this.professors];
  }

  onFilter(): void {
    if (!this.filterText.trim()) {
      this.filteredProfessors = [...this.professors];
    } else {
      const searchTerm = this.filterText.toLowerCase().trim();
      this.filteredProfessors = this.professors.filter(professor =>
        professor.nom.toLowerCase().includes(searchTerm) ||
        professor.prenom.toLowerCase().includes(searchTerm) ||
        professor.email.toLowerCase().includes(searchTerm)
      );
    }
  }
  onModule(professor: Professor): void {
    //chercher la matiere dont ce prof est le responsable 

    this.router.navigate(['/admin-matiere-details']);
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) {
      this.professors = this.professors.filter(p => p.id !== id);
      this.onFilter(); // Refresh the filtered list
    }
  }

  


  
 

  
  onEdit2(matiere: Matiere): void {
    this.router.navigate(['/detail-matiere', matiere.id]);
  }

}


