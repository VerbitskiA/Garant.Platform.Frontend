import {Inject, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {NgHttpLoaderModule} from 'ng-http-loader';
import {GarLibModule} from "./gar-lib/gar-lib.module";
import {WINDOW} from "../environments/window/window.token";
import {WindowProvider} from "../environments/window/window.provider";
import {NgxMetrikaModule} from "@kolkov/ngx-metrika";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PipesModule} from "./core/pipes/pipes.module";
import {ServicesModule} from "./core/services/services.module";
import {SharedModule} from "./shared/shared.module";
import {ModulesModule} from "./modules/modules.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule.forRoot(),
    GarLibModule,
    NgxMetrikaModule.forRoot(),
    FontAwesomeModule,
    PipesModule,
    ServicesModule,
    SharedModule,
    ModulesModule,
    ToastModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    @Inject(WINDOW)
    private _window: WindowProvider
  ) {
    this._window.application.grades = {
      phone: 767,
      tabletSmall: 768,
      tablet: 1024,
      desktop: 1440
    };
  }
}
