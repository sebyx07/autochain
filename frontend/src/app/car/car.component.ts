import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CarsService} from '../services/cars.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  images: any[] = [];
  car: any;
  user: any;
  constructor(
    protected carsService: CarsService,
    protected activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    // this.images.push({source:'assets/a1.jpg', alt:'Description for Image 1', title:'Title 1'});
    this.activeRoute.params.subscribe(
      params => {
        const id = params['id'];
        this.carsService.getCar(id).subscribe((response: any) => {
          this.car = response.data;
          // this.carsService.getOwnerCar(response.data.id).subscribe((response: any) => {
          //   this.user = response.data;
          // });
          console.log(response.data.attributes.images);
          for (let img in response.data.attributes.images ) {
            // console.log(response.data.attributes.images[img]);
            this.images.push({source: response.data.attributes.images[img], alt:'Poza', title:'Poza'});
          }
        });
      }
    );

  }

}
