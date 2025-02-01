import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import {count, forkJoin} from 'rxjs';
import { map } from 'rxjs/operators';
import { EtudiantService } from "../services/etudiant.service";
import { MatiereService } from "../services/matiere.service";
import { ProfesseurService } from "../services/professeur.service";
import { InscriptionService } from "../services/inscription.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, BrowserModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEtudiants: number = 0;
  totalMatieres: number = 0;
  totalProfs: number = 0;
  totalInscriptions: number = 0;
  inscriptionsCount: Map<number, number> = new Map();
  modulesData: { module: string;students:number; percentage: number }[] = [];

  highestModule: { module: string; students: number; percentage: number } | null = null;
  lowestModule: { module: string; students: number; percentage: number } | null = null;

  maxModule: { module: string; students: number; percentage: number } = { module: '', students: 0, percentage: 0 };
  minModule: { module: string; students: number; percentage: number } = { module: '', students: 0, percentage: 0 };

  constructor(
    private etudiantService: EtudiantService,
    private matiereService: MatiereService,
    private profService: ProfesseurService,
    private inscriptionService: InscriptionService
  ) { }

  ngOnInit() {
    console.log('Chargement des données du tableau de bord...');
    this.getTotalEtudiants();
    this.getTotalMatieres();
    this.getTotalProfs();
    this.getTotalInscriptions();
    this.getInscriptionsCount();
  }

  getChartWidth(): number {
    const width = Math.min(this.inscriptionsCount.size * 80, 500);
    console.log('Largeur du graphique:', width);
    return width;
  }

  getInscriptionsCount(): void {
    console.log('Récupération du nombre d\'inscriptions par module...');
    this.inscriptionService.getInscriptionsCountByModule().subscribe(
      (data: any) => {
        console.log('Réponse du serveur pour les inscriptions:', data);
        const entries: [number, number][] = Object.entries(data).map(([key, value]) => [Number(key), value as number]);
        this.inscriptionsCount = new Map<number, number>(entries);
        console.log('Nombre d\'inscriptions par module :', this.inscriptionsCount);
        this.fetchMatiereNames();
        this.findMaxModule();
        this.findMinModule();
      },
      (error) => {
        console.error('Erreur lors de la récupération des inscriptions:', error);
      }
    );
  }

  fetchMatiereNames(): void {
    this.modulesData = [];
    console.log('Récupération des noms des matières...');
    this.inscriptionsCount.forEach((count, moduleId) => {
      this.matiereService.getMatiereById(moduleId).subscribe(
        (matiere) => {
          const percentage = this.calculatePercentage(count);
          this.modulesData.push({students: count, module: matiere.nom, percentage });
          console.log(`Module ${matiere.nom} a ${count} inscriptions.`);
        },
        (error) => {
          console.error(`Erreur lors de la récupération de la matière ${moduleId}:`, error);
        }
      );
    });
  }

  findMaxModule(): void {
    let maxCount = 0;
    const maxModuleObservables: any[] = [];
    console.log('Recherche du module avec le plus grand nombre d\'inscriptions...');

    this.inscriptionsCount.forEach((count, moduleId) => {
      maxModuleObservables.push(
        this.matiereService.getMatiereById(moduleId).pipe(
          map((matiere) => {
            if (count > maxCount) {
              maxCount = count;
              this.highestModule = {
                module: matiere.nom,
                students: count,
                percentage: this.calculatePercentage(count)
              };
              console.log(`Module avec le plus grand nombre d'inscriptions trouvé : ${matiere.nom} (${count} inscriptions)`);
            }
          })
        )
      );
    });

    forkJoin(maxModuleObservables).subscribe(() => {
      console.log('Module avec le plus grand nombre d\'inscriptions:', this.highestModule);
    });
  }

  findMinModule(): void {
    let minCount = Infinity;
    const minModuleObservables: any[] = [];
    console.log('Recherche du module avec le moins grand nombre d\'inscriptions...');

    this.inscriptionsCount.forEach((count, moduleId) => {
      minModuleObservables.push(
        this.matiereService.getMatiereById(moduleId).pipe(
          map((matiere) => {
            if (count < minCount) {
              minCount = count;
              this.lowestModule = {
                module: matiere.nom,
                students: count,
                percentage: this.calculatePercentage(count)
              };
              console.log(`Module avec le moins grand nombre d'inscriptions trouvé : ${matiere.nom} (${count} inscriptions)`);
            }
          })
        )
      );
    });

    forkJoin(minModuleObservables).subscribe(() => {
      console.log('Module avec le moins grand nombre d\'inscriptions:', this.lowestModule);
    });
  }

  calculatePercentage(count: number): number {
    const totalStudents = this.totalEtudiants;
    const percentage = (count / totalStudents) * 100;
    console.log(`Calcul du pourcentage pour ${count} inscriptions sur ${totalStudents} étudiants: ${percentage}%`);
    return percentage;
  }

  getTotalEtudiants(): void {
    console.log('Récupération du total des étudiants...');
    this.etudiantService.getTotalEtudiants().subscribe(
      (response: number) => {
        console.log('Total des étudiants:', response);
        this.totalEtudiants = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération du total des étudiants', error);
      }
    );
  }

  getTotalMatieres(): void {
    console.log('Récupération du total des matières...');
    this.matiereService.getTotaMatieres().subscribe(
      (response: number) => {
        console.log('Total des matières:', response);
        this.totalMatieres = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération du total des matières', error);
      }
    );
  }

  getTotalInscriptions(): void {
    console.log('Récupération du total des inscriptions...');
    this.inscriptionService.getTotalInscriptions().subscribe(
      (response: number) => {
        console.log('Total des inscriptions:', response);
        this.totalInscriptions = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération du total des inscriptions', error);
      }
    );
  }

  getTotalProfs(): void {
    console.log('Récupération du total des professeurs...');
    this.profService.getTotalProf().subscribe(
      (response: number) => {
        console.log('Total des professeurs:', response);
        this.totalProfs = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération du total des professeurs', error);
      }
    );
  }
}
