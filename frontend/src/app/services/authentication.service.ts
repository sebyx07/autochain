import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable()
export class AuthenticationService {

  constructor(
    protected http: HttpClient
  ) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('/authentication',
      {
      email: email,
      password: password
    },
      {observe: 'response'});
  }

  logout(): Observable<any> {
    return this.http.delete('/authentication');
  }

  register( name: string, email: string, password: string, password_confirmation: string ): Observable<any> {
    return this.http.post('/authentication/register',
      {
        email: email,
        name: name,
        password: password,
        password_confirmation: password_confirmation
      },
      {observe: 'response'}
    );
  }

  currentUser( ) {
    return this.http.get('/authentication/current_user');
  }

}
