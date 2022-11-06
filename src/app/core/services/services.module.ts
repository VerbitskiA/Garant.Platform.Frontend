import {APP_INITIALIZER, NgModule} from '@angular/core';
import {SESSION_TOKEN, SessionService} from "./session/session.service";
import {MetrikaService} from "./common/metrika.service";
import {CommonDataService} from "./common/common-data.service";
import {GarantService} from "./garant/garant.service";
import {DataService} from "./common/data-service";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {DocumentService} from "./garant/document.service";
import {NotifyService} from "./notify/notify.service";
import {LandingRequestService} from "./landing/landing.service";
import {WINDOW} from "../../../environments/window/window.token";
import {WindowProvider} from "../../../environments/window/window.provider";
import {HttpClientService} from "./base.service";
import {InterceptorsModule} from "../interceptors/interceptors.module";
// import {ConfirmationService} from "primeng/api/confirmationservice";
import {NewsService} from "./news/news.service";
import {ConfiguratorService} from "./configurator/configurator.service";


@NgModule({
  declarations: [],
  imports: [
    InterceptorsModule
  ],
  providers: [
    {
      provide: SESSION_TOKEN,
      useClass: SessionService
    },
    // ConfirmationService,
    MessageService,
    NotifyService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (notifyService: NotifyService) => () => notifyService.initiateSignalrConnection(),
    //   deps: [NotifyService],
    //   multi: true,
    // },
    {
      provide: WINDOW,
      useClass: WindowProvider
    },
    HttpClientService,
    MetrikaService,
    CommonDataService,
    GarantService,
    DataService,
    Title,
    DocumentService,
    NotifyService,
    LandingRequestService,
    NewsService,
    ConfiguratorService
  ]
})
export class ServicesModule {
}
