import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from '../../models/matière.model';
@Component({
  selector: 'app-mes-matiere',
  standalone: true,
  imports: [CommonModule,MatTooltipModule,FormsModule],
  templateUrl: './mes-matiere.component.html',
  styleUrl: './mes-matiere.component.css'
})
export class MesMatiereComponent {

  constructor(private router: Router) {

  }




  ngOnInit(): void {

  }


}

