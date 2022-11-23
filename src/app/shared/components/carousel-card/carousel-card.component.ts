import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


interface Car {

  id?: string;

  name?: string;

  description?: string;

  price?: number;
}


@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.scss']
})

export class CarouselCardComponent {
  cars: Car[] = [];
  constructor() { }
  ngOnInit() {

    this.cars = [

      {

        id: '1',

        name: 'Bugatti',

        description: 'Racing car',

        price: 800,

      },

      {

        id: '2',

        name: 'Ferrari',

        description: 'The Prancing Horse',

        price: 1500,

      },

      {

        id: '3',

        name: 'Porsche',

        description: 'Full spectrum',

        price: 10000,

      },

    ];

  }
}
