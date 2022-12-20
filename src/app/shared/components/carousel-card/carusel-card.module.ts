import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselCardComponent} from "./carousel-card.component";
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";


const components = [
  CarouselCardComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
  ]
})
export class CaruselCardModule {
}
