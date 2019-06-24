import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-landing',
  templateUrl: './nav-landing.component.html',
  styleUrls: ['./nav-landing.component.css']
})
export class NavLandingComponent implements OnInit {

  public scrolled = false;
  public toggle = false;

  @HostListener('window:scroll') private onWindowScroll() {
    if (window.pageYOffset > 280) {
      this.scrolled = true;
    }
    else {
      this.scrolled = false;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
