import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from '../../../models/Professor.model';
import { Matiere } from '../../../models/matière.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProfesseurService} from "../../../services/professeur.service";
import {Prof} from "../../../models/Prof.model";
@Component({
  selector: 'app-prof',
  standalone: true,
  imports: [MatTooltipModule,CommonModule,FormsModule],
  templateUrl: './prof.component.html',
  styleUrl: './prof.component.css'
})
export class ProfComponent implements OnInit {

  filteredProfessors: Prof[] = [];
  filterText: string = '';
  professors: Prof[] = [];

  constructor(private router: Router, private profService: ProfesseurService) {}

  ngOnInit(): void {
    this.loadProfs(); // Appel à la méthode pour charger les professeurs
  }

  loadProfs(): void {
    this.profService.getProfs().subscribe(
      (data) => {
        this.professors = data;
        this.filteredProfessors = [...this.professors]; // Assurez-vous que les données sont bien affectées
      },
      (error) => {
        console.error('Erreur lors du chargement des professeurs', error);
      }
    );
  }

  onFilter(): void {
    if (!this.filterText.trim()) {
      this.filteredProfessors = [...this.professors];
    } else {
      const searchTerm = this.filterText.toLowerCase().trim();
      this.filteredProfessors = this.professors.filter(professor =>
        professor.nom.toLowerCase().includes(searchTerm) ||
        professor.prenom.toLowerCase().includes(searchTerm) ||
        professor.user.email.toLowerCase().includes(searchTerm)
      );
    }
  }


  onEdit2(matiere: Matiere): void {
    this.router.navigate(['/detail-matiere', matiere.id]);
  }

}


