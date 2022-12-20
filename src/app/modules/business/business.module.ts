import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatalogBusinessComponent} from "./catalog-business/catalog-business.component";
import {CreateReadyBusinessComponent} from "./create-ready-business/create-ready-business.component";
import {EditReadyBusinessComponent} from "./edit-ready-business/edit-ready-business.component";
import {ViewReadyBusinessComponent} from "./view-ready-business/view-ready-business.component";
import {GarLibModule} from "../../gar-lib/gar-lib.module";
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {GalleriaModule} from "primeng/galleria";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CheckboxModule} from "primeng/checkbox";
import {InputSwitchModule} from "primeng/inputswitch";
import {ToastModule} from "primeng/toast";
import {PromoModule} from "../promo/promo.module";
import {NewsModule} from "../news/news.module";
import {ProductsModule} from "../products/products.module";
import {CaruselCardModule} from "../../shared/components/carousel-card/carusel-card.module";

const components = [
  CatalogBusinessComponent,
  CreateReadyBusinessComponent,
  EditReadyBusinessComponent,
  ViewReadyBusinessComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    GarLibModule,
    FormsModule,
    PaginatorModule,
    GalleriaModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    InputSwitchModule,
    ToastModule,
    PromoModule,
    NewsModule,
    ProductsModule,
    CaruselCardModule
  ],
  exports: [...components]
})
export class BusinessModule { }
