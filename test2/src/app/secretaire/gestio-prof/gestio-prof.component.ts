import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Prof } from '../../models/Prof.model'; // Assurez-vous que le modèle est correct
import { ProfesseurService } from '../../services/professeur.service';

@Component({
  selector: 'app-gestio-prof',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, FormsModule],
  templateUrl: './gestio-prof.component.html',
  styleUrls: ['./gestio-prof.component.css']
})
export class GestioProfComponent implements OnInit {

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

  onEdit(professor: Prof): void {
    this.router.navigate(['/detail-prof', professor.id]);
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) {
        this.profService.deleteProf(id).subscribe(() => {
         this.loadProfs();
        });
      }
    }


  // onEdit2(matiere: Matiere): void {
  //   this.router.navigate(['/detail-matiere', matiere.id]);
  // }
}
