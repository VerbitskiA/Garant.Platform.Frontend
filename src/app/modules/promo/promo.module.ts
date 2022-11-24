import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PromoBlockCardComponent} from './promo-block.card/promo-block.card.component';
import {GarLibModule} from "../../gar-lib/gar-lib.module";
import {RouterModule} from "@angular/router";
import {PromotionCardComponent} from './promotion.card/promotion.card.component';
import {CaruselCardModule} from "../../shared/components/carousel-card/carusel-card.module";


const components = [
  PromoBlockCardComponent,
  PromotionCardComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    GarLibModule,
    RouterModule,
    CaruselCardModule
  ]
})
export class PromoModule {
}
