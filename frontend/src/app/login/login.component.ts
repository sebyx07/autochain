import { Component, OnInit } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {Message} from "primeng/api";
import {MessageService} from 'primeng/components/common/messageservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    protected authenticationService: AuthenticationService,
    protected router: Router,
    private messageService: MessageService
  ) { }

  public ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  login() {
    let errors = false;
    if (this.email.errors && this.email.errors.required) {
      errors = true;
      this.messageService.add({severity: 'warn', summary: 'Campul pentru email nu poate fi gol!', detail: 'Incercati din nou.'});
    }
    if (this.password.errors && this.password.errors.required) {
      errors = true;
      this.messageService.add({severity: 'warn', summary: 'Campul pentru parola nu poate fi gol!', detail: 'Incercati din nou.'});
    }
    if (!errors) {
      this.authenticationService.login(this.email.value, this.password.value).subscribe((data: any) => {
        if (data.status === 200) {
          this.router.navigate(['/']);
        }
      }, (error) => {
        this.messageService.add({severity: 'error', summary: 'Login nereusit!', detail: error.error.error});
      });
    }
  }

}
