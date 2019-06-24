import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CarsService {

  constructor(
    private  http: HttpClient
  ) { }


  getAllCars(): Observable<any> {
    return this.http.get('/api/cars');
  }

  getCar(id: string): Observable<any> {
    return this.http.get('/api/cars/' + id);
  }

  getOwnerCar(user: string): Observable<any> {
    return this.http.get('/api/cars/' + user + '/user');
  }

  addCar(body: any): Observable<any> {
    return this.http.post('/api/cars', body);
  }


}
