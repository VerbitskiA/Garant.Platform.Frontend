import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {NgHttpLoaderModule} from 'ng-http-loader';
import {GarLibModule} from "./gar-lib/gar-lib.module";
import {NgxMetrikaModule} from "@kolkov/ngx-metrika";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PipesModule} from "./core/pipes/pipes.module";
import {ServicesModule} from "./core/services/services.module";
import {SharedModule} from "./shared/shared.module";
import {ModulesModule} from "./modules/modules.module";
import {JwtModule} from "@auth0/angular-jwt";
import {Session} from "./core/services/session/session.service";
import tokenGetter = Session.tokenGetter;
import {API_URL} from "./core/core-urls/api-url";

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
    ToastModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200', API_URL.apiUrl]
      }
    })
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
