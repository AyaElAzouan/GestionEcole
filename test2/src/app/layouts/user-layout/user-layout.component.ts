import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule, Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import $ from 'jquery';
import { filter, Subscription } from 'rxjs';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports:[SidebarComponent,NavbarComponent,FooterComponent,RouterOutlet,CommonModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent implements OnInit, AfterViewInit{
  private _router!: Subscription;
  private lastPoppedUrl: string | undefined;
  private yScrollStack: number[] = [];

  constructor(public location: Location, private router: Router) {}

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1;

    if (isWindows && !document.body.classList.contains('sidebar-mini')) {
      document.body.classList.add('perfect-scrollbar-on');
    } else {
      document.body.classList.remove('perfect-scrollbar-off');
    }

    const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
    const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url ?? '';
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          const scrollY = this.yScrollStack.pop();
          window.scrollTo(0, scrollY !== undefined ? scrollY : 0);
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

    this._router = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        elemMainPanel.scrollTop = 0;
        elemSidebar.scrollTop = 0;
      });

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      new PerfectScrollbar(elemMainPanel);
      new PerfectScrollbar(elemSidebar);
    }

    this.handleSidebarInteractions();
  }

  ngAfterViewInit() {
    this.runOnRouteChange();
  }

isMaps(path:any){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice( 1 );
    if(path == titlee){
        return false;
    }
    else {
        return true;
    }
}

  handleSidebarInteractions() {
    const $sidebar = $('.sidebar');
    const $sidebar_responsive = $('body > .navbar-collapse');
    const $sidebar_img_container = $sidebar.find('.sidebar-background');

    const window_width: number = $(window).width() as number;

    if (window_width > 767) {
      if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
        $('.fixed-plugin .dropdown').addClass('open');
      }
    }

    $('.fixed-plugin a').click(function(event) {
      if ($(this).hasClass('switch-trigger')) {
        event.stopPropagation();
      }
    });

    $('.fixed-plugin .badge').click(function() {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      const new_color = $(this).data('color');
      if ($sidebar.length !== 0) {
        $sidebar.attr('data-color', new_color);
      }
      if ($sidebar_responsive.length !== 0) {
        $sidebar_responsive.attr('data-color', new_color);
      }
    });

    $('.fixed-plugin .img-holder').click(function() {
      $(this).parent('li').siblings().removeClass('active');
      $(this).parent('li').addClass('active');

      const new_image = $(this).find("img").attr('src');
      if ($sidebar_img_container.length !== 0) {
        $sidebar_img_container.fadeOut('fast', function() {
          $sidebar_img_container.css('background-image', `url("${new_image}")`);
          $sidebar_img_container.fadeIn('fast');
        });
      }
    });
  }

  isMac(): boolean {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0;
  }

  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
}
