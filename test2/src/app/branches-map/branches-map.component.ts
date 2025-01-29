import { Component, ViewChild, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
//import { Branch, BranchMapMarker } from '../models';
@Component({
  selector: 'app-branches-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    RouterModule,
  ],
  providers: [],
  templateUrl: './branches-map.component.html',
  styleUrl: './branches-map.component.css'
})

export class BranchesMapComponent {
 
}
