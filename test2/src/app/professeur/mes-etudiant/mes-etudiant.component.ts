import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from '../../models/etudiant.model';
@Component({
  selector: 'app-mes-etudiant',
  standalone: true,
   imports: [CommonModule,MatTooltipModule,FormsModule],
  templateUrl: './mes-etudiant.component.html',
  styleUrl: './mes-etudiant.component.css'
})
export class MesEtudiantComponent {

 constructor(private router: Router) {

  }

  filteredEtudiants: Etudiant[] = [];
  filterText: string = '';

  etudiants = [
    { 
      id: 1, 
      cne: 'CNE123456', 
      cin: 'AB123456', 
      nom: 'Akiirne', 
      prenom: 'Amal', 
      email: 'akiirne@uae.ac.ma', 
      adresse: 'Rabat, Maroc', 
      numTele: '0612345678', 
      dateNAissance: '1990-05-12' 
    },
    { 
      id: 2, 
      cne: 'CNE789012', 
      cin: 'CD789012', 
      nom: 'Amh', 
      prenom: 'Wiam', 
      email: 'amh@uae.ac.ma', 
      adresse: 'Casablanca, Maroc', 
      numTele: '0623456789', 
      dateNAissance: '1988-08-20' 
    },
    { 
      id: 3, 
      cne: 'CNE345678', 
      cin: 'EF345678', 
      nom: 'Aya', 
      prenom: 'El', 
      email: 'el@uae.ac.ma', 
      adresse: 'Marrakech, Maroc', 
      numTele: '0634567890', 
      dateNAissance: '1995-02-15' 
    }
  ];
  ngOnInit(): void {
    this.filteredEtudiants = [...this.etudiants];
  }

  onFilter(): void {
    if (!this.filterText.trim()) {
      this.filteredEtudiants = [...this.etudiants];
    } else {
      const searchTerm = this.filterText.toLowerCase().trim();
      this.filteredEtudiants = this.etudiants.filter(professor =>
        professor.nom.toLowerCase().includes(searchTerm) ||
        professor.prenom.toLowerCase().includes(searchTerm) ||
        professor.email.toLowerCase().includes(searchTerm)
      );
    }
  }
  onEdit(etu: Etudiant): void {
    this.router.navigate(['/detail-etu', etu.id]);
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.etudiants = this.etudiants.filter(p => p.id !== id);
      this.onFilter(); // Refresh the filtered list
    }
  }


  

}



