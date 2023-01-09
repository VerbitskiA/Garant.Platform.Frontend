import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FranchiseModule} from "./franchise/franchise.module";
import {BlogModule} from "./blog/blog.module";
import {BusinessModule} from "./business/business.module";
import {ConfiguratorModule} from "./configurator/configurator.module";
import {DemoModule} from "./demo/demo.module";
import {GarantModule} from "./garant/garant.module";
import {LandingModule} from "./landing/landing.module";
import {NewsModule} from "./news/news.module";
import {ProductsModule} from "./products/products.module";
import {PromoModule} from "./promo/promo.module";
import {ProfileModule} from "./profile/profile.module";
import {SharedModule} from "primeng/api";
import {LoginAndRegistrationModule} from "./login-and-registration/login-and-registration.module";
import {SectionsRoutingModule} from "./sections-routing.module";


@NgModule({
  declarations: [],
  exports: [],
  imports: [
    SectionsRoutingModule,
    CommonModule,
    BlogModule,
    BusinessModule,
    ConfiguratorModule,
    DemoModule,
    FranchiseModule,
    GarantModule,
    LandingModule,
    NewsModule,
    ProductsModule,
    ProfileModule,
    PromoModule,
    LoginAndRegistrationModule,
    SharedModule,
  ]
})
export class ModulesModule { }
