import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';


@Component({
  selector: 'app-detail-etu',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './detail-etu.component.html',
  styleUrl: './detail-etu.component.css'
})
export class DetailEtuComponent {

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

  
  
  etuForm !: FormGroup;
 
  router = inject(Router);
  idT!: number;
  readonly dialog = inject(MatDialog);
  nom: string = '';
  constructor(private route: ActivatedRoute,private fb: FormBuilder,@Inject(DOCUMENT) public document: Document) {
    this.etuForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', Validators.required],
    cin: ['', Validators.required],
    cne: ['', Validators.required],
    adresse: ['', Validators.required],
    numTele: ['', Validators.required],
    naissance_date: ['', Validators.required],

    });
    }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    const professor = this.etudiants.find((etu) => etu.id === Number(id)); 
    if (professor) {
      this.etuForm.patchValue(professor); 
      this.nom=professor.nom;
    }
  }
  
 
  
    onSubmit() {
     
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: { idT: this.idT }
    });
  }

}


