import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {RouterLinkActive, RouterLinkWithHref} from "@angular/router";
import {GarLibModule} from "../gar-lib/gar-lib.module";
import {PipesModule} from "../core/pipes/pipes.module";
import {FormsModule} from "@angular/forms";
import {CreateAdComponent} from "./components/create-ad/create-ad.component";
import {RadioButtonModule} from "primeng/radiobutton";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";
import {LoginComponent} from "./components/login/login.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {MainSearchComponent} from "./components/main-search/main-search.component";
import {ProductsModule} from "../modules/products/products.module";
import {PromoModule} from "../modules/promo/promo.module";
import {NewsModule} from "../modules/news/news.module";
import { StaticInfoComponent } from './components/static-info/static-info.component';
import { LandingHeaderCardComponent } from './components/landing-header-card/landing-header-card.component';

const components = [
  HeaderComponent,
  FooterComponent,
  CreateAdComponent,
  LoginComponent,
  MainPageComponent,
  MainSearchComponent,
  StaticInfoComponent
];

@NgModule({
  declarations: [...components, LandingHeaderCardComponent],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    GarLibModule,
    PipesModule,
    FormsModule,
    RadioButtonModule,
    DropdownModule,
    CheckboxModule,
    InputSwitchModule,
    ProductsModule,
    PromoModule,
    NewsModule,
    RouterLinkActive
  ],
	exports: [...components, LandingHeaderCardComponent]
})
export class SharedModule { }
