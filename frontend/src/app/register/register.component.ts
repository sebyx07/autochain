import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/api";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    protected authenticationService: AuthenticationService,
    protected router: Router,
    private messageService: MessageService
  ) { }

  public ngOnInit(): void {
    window.scrollTo(0, 0);
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    });
  }

  get name() { return this.registerForm.get('name'); }

  get email() { return this.registerForm.get('email'); }

  get password() { return this.registerForm.get('password'); }

  get password_confirmation() { return this.registerForm.get('password_confirmation'); }

  register() {
    let errors = false;
    if (this.name.errors && this.name.errors.required) {
      errors = true;
      this.messageService.add({severity: 'warn', summary: 'Campul pentru nume nu poate fi gol!', detail: 'Incercati din nou.'});
    }
    if (this.email.errors) {
      errors = true;
      if (this.email.errors.required) {
        this.messageService.add({severity: 'warn', summary: 'Campul pentru email nu poate fi gol!', detail: 'Incercati din nou.'});
      }
      if (this.email.errors.email) {
        this.messageService.add({severity: 'warn', summary: 'Textul introdus in campul pentru email nu corespunde unui email!', detail: 'Incercati din nou.'});
      }
    }
    if (this.password.errors && this.password.errors.required) {
      errors = true;
      this.messageService.add({severity: 'warn', summary: 'Campul pentru parola nu poate fi gol!', detail: 'Incercati din nou.'});
    }
    if (this.password_confirmation.errors && this.password_confirmation.errors.required) {
      errors = true;
      this.messageService.add({severity: 'warn', summary: 'Campul pentru confirmarea parolei nu poate fi gol!', detail: 'Incercati din nou.'});
    }
    if (!errors) {
      this.authenticationService.register(this.name.value, this.email.value, this.password.value, this.password_confirmation.value)
        .subscribe(data => {
        if (data) {
          this.router.navigate(['/login']);
        }
      }, (error) => {
          for (let err in error.error.errors) {
            this.messageService.add({severity: 'error', summary: err, detail: error.error.errors[err]});
          }
        });
    }
  }
}
