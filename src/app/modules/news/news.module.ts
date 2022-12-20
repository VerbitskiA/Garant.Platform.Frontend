import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsPageComponent} from "./news.page/news.page.component";
import {RouterModule} from "@angular/router";
import {GarLibModule} from "../../gar-lib/gar-lib.module";
import {ProductsModule} from "../products/products.module";
import {NewsBlockComponent} from "./news.block/news.block.component";
import {PromoModule} from "../promo/promo.module";
import {BusinessNewsBlockComponent} from './business-news.block/business-news.block.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const components = [
  NewsPageComponent,
  NewsBlockComponent,
  BusinessNewsBlockComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: NewsPageComponent
    }]),
    GarLibModule,
    ProductsModule,
    PromoModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewsModule {
}
