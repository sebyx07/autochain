import {Component, Input, OnInit} from '@angular/core';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {CarsService} from '../services/cars.service';
import {} from 'node';


const {
  JSORMBase,
  attr,
  belongsTo,
  hasMany
  // etc
} = require("jsorm/dist/jsorm")


const ApplicationRecord = JSORMBase.extend({
  static: {
    baseUrl: "http://localhost:3000",
    apiNamespace: "/api"
  }
})

const Car =  ApplicationRecord.extend({
  static: {
    jsonapiType: "cars"
  },

  attrs: {
    'model': attr(),
    'brand': attr(),
    'firstRegistration': attr(),
    'color': attr(),
    'numberOfKilometers': attr(),
    'priceEuro': attr(),
    'numberOfDoors': attr(),
    'transmissionType': attr(),
    'description': attr(),
    'fuelType': attr(),
    'images' : attr(),
    'isPremium' : attr()
  }
})

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {

  constructor(
    protected router: Router,
    protected carsService: CarsService
  ) { }

  @Input('inputCars')
  cars: any[];

  ngOnInit(
  ) {

    Car.all().then((cars) =>{
      console.log(cars)
      console.log(cars.data)
      console.log(cars.data[1])
      this.cars = cars.data;
    });

    // this.carsService.getAllCars().subscribe( (response:any) => {
    //   this.cars = response.data;
    // });
  }

  viewCar(number) {
    this.router.navigate(['/car/' + number.toString()]);
  }

}
