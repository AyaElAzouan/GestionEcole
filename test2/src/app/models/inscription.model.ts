import {Matiere} from "./matière.model";
import {Etudiant} from "./etudiant.model";

export class Inscription {
  id?: number;            // L'ID est généré automatiquement
  etudiantId!: number;     // Utilisation de l'opérateur "!" pour indiquer que la propriété sera définie plus tard
  moduleId!: number;       // Utilisation de l'opérateur "!" pour indiquer que la propriété sera définie plus tard
  dateInscription!: Date;
  etudiant?: Etudiant;     // Ajouter la référence à l'objet Etudiant
  module?: Matiere;

  constructor(etudiantId: number, moduleId: number, dateInscription: Date) {
    this.etudiantId = etudiantId;
    this.moduleId = moduleId;
    this.dateInscription = dateInscription;
  }
}
