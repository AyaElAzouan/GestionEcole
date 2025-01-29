import { Component, OnInit, ElementRef } from '@angular/core';
import { ADMIN_ROUTES,PROF_ROUTES,SECRETAIRE_ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Correction: 'styleUrl' to 'styleUrls'
})
export class NavbarComponent implements OnInit {
  private listTitlesU!: any[];
  private listTitlesA!: any[];
  private listTitlesS!: any[];
  location: Location;
  mobile_menu_visible: number = 0;
  private toggleButton !: HTMLElement | null;
  private sidebarVisible: boolean;
  
  constructor(location: Location, private element: ElementRef, private router: Router,private authService: AuthService) {
    this.location = location;
    this.sidebarVisible = false;
  }


  ngOnInit() {
    this.listTitlesU = PROF_ROUTES.filter(listTitlesU => listTitlesU);
    this.listTitlesA = ADMIN_ROUTES.filter(listTitlesA => listTitlesA);
    this.listTitlesS = SECRETAIRE_ROUTES.filter(listTitlesA => listTitlesA);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0] as HTMLElement;

    this.router.events.subscribe(() => {
      this.sidebarClose();
      const layer: HTMLElement | null = document.getElementsByClassName('close-layer')[0] as HTMLElement | null;
      if (layer) {
        layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(() => {
      if (toggleButton) {
        toggleButton.classList.add('toggled');
      }
    }, 500);

    body.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    if (this.toggleButton) {
      this.toggleButton.classList.remove('toggled');
    }
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  sidebarToggle() {
    const $toggle = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement; // Type explicite
    const body = document.getElementsByTagName('body')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }

    if (this.mobile_menu_visible === 1) {
      body.classList.remove('nav-open');
      const layer: HTMLElement | null = document.getElementsByClassName('close-layer')[0] as HTMLElement | null;
      if (layer) {
        layer.remove(); // Vérifie que layer n'est pas null
      }
      setTimeout(() => {
        if ($toggle) {
          $toggle.classList.remove('toggled');
        }
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(() => {
        if ($toggle) {
          $toggle.classList.add('toggled');
        }
      }, 430);

      const layer = document.createElement('div') as HTMLDivElement; // Type explicite
      layer.setAttribute('class', 'close-layer');

      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild(layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild(layer);
      }

      setTimeout(() => {
        layer.classList.add('visible');
      }, 100);

      layer.onclick = () => {
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        layer.classList.remove('visible');
        setTimeout(() => {
          layer.remove(); // Assurez-vous que layer est un HTMLDivElement
          if ($toggle) {
            $toggle.classList.remove('toggled');
          }
        }, 400);
      };

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
if(this.authService.currentUserRole() =="ROLE_USER"){
  for (let item = 0; item < this.listTitlesU.length; item++) {
    if (this.listTitlesU[item].path === titlee) {
      return this.listTitlesU[item].title;
    }
  }
  return 'Catalogue';
}else if(this.authService.currentUserRole() =="ROLE_ADMIN"){
  for (let item = 0; item < this.listTitlesA.length; item++) {
    if (this.listTitlesA[item].path === titlee) {
      return this.listTitlesA[item].title;
    }
  }
  return 'Dashboard';
}
}
    
}