import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const PROF_ROUTES: RouteInfo[] = [
    { path: '/user-compte', title: 'Mon Profile',  icon:'person', class: '' },
    { path: '/mes-matieres', title: 'Job',  icon: 'dashboard', class: '' },
    { path: '/logout', title: 'Logout',  icon:'exit_to_app', class: '' },
];


export const SECRETAIRE_ROUTES: RouteInfo[] = [
  { path: '/user-compte', title: 'Mon Profile',  icon:'person', class: '' },
  { path: '/create-etu', title: 'Ajouter étudiant',  icon:'add', class: '' },
  { path: '/gestion-etu', title: 'Liste étudiants',  icon:'groups', class: '' },
  { path: '/gestion-prof', title: 'Gestion des prof',  icon:'assignment_turned_in', class: '' },
  { path: '/create-matiere', title: 'Ajouter matière',  icon:'book', class: '' },
  { path: '/gestion-matiere', title: 'Liste de matières',  icon:'assignment_turned_in', class: '' },
  { path: '/logout', title: 'Logout',  icon:'exit_to_app', class: '' },
  
  
 
];

export const ADMIN_ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/user-compte', title: 'Mon Profile',  icon:'person', class: '' },
  { path: '/prof', title: 'Détails',  icon:'manage_history', class: '' },
  { path: '/logout', title: 'Logout',  icon:'exit_to_app', class: '' },

];
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  menuItems !: any[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userRole = this.authService.currentUserRole();
    if (userRole === 'ADMIN') {
    this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
  } else if (userRole === 'PROF') {
    this.menuItems = PROF_ROUTES.filter(menuItem => menuItem);
  }else if (userRole === 'SECRETAIRE') {
    this.menuItems = SECRETAIRE_ROUTES.filter(menuItem => menuItem);
  }
  }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
