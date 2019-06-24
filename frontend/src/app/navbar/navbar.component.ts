import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any = false;
  constructor(
    protected  router: Router,
    protected  auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.auth.currentUser().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.auth.logout().subscribe(data => {
      if(data) {
        location.reload();
      }
    });
  }

}
