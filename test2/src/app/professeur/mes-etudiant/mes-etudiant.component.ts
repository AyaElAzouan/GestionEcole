import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from '../../models/etudiant.model';
import {EtudiantService} from "../../services/etudiant.service";
@Component({
  selector: 'app-mes-etudiant',
  standalone: true,
   imports: [CommonModule,MatTooltipModule,FormsModule],
  templateUrl: './mes-etudiant.component.html',
  styleUrl: './mes-etudiant.component.css'
})
export class MesEtudiantComponent {
  etudiants: Etudiant[] = [];
  filteredEtudiants: Etudiant[] = [];
  filterText: string = '';
  constructor(private router: Router,
              private etudiantService: EtudiantService) {

  }


  ngOnInit(): void {
    this.loadEtudiants();
  }
  loadEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe(data => {
      this.etudiants = data;
      this.filteredEtudiants = data;
    });
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
      this.etudiantService.deleteEtudiant(id).subscribe(() => {
        this.etudiants = this.etudiants.filter(etudiant => etudiant.id !== id);
        this.onFilter();
      });
    }
  }
  addStudent():void{
    this.router.navigate(['/create-etu']);
  }





}



