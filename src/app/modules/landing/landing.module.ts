import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultingLandingComponent} from "./consulting-landing/consulting-landing.component";
import {DealLandingComponent} from "./deal-landing/deal-landing.component";
import {FranchiseLandingComponent} from "./franchise-landing/franchise-landing.component";
import {ToastModule} from "primeng/toast";
import {FormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {CardModule} from "primeng/card";
import {CarouselModule} from "primeng/carousel";
import {GarLibModule} from "../../gar-lib/gar-lib.module";
import {NewsModule} from "../news/news.module";
import {PromoModule} from "../promo/promo.module";

const components = [
  ConsultingLandingComponent,
  DealLandingComponent,
  FranchiseLandingComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ToastModule,
    FormsModule,
    InputMaskModule,
    CarouselModule,
    GarLibModule,
    NewsModule,
    CardModule,
    PromoModule
  ],
  exports: [...components]
})
export class LandingModule { }
