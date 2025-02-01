import {User} from "./user.model";

export interface Prof {

  id: number;
  cin: string;
  code: string;
  nom: string;
  prenom: string;
  adresse: string;
  numTele: string;
  matieres: number[]; // Liste de matières, probablement des IDs
  user: User;


}
