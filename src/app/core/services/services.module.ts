import {APP_INITIALIZER, NgModule} from '@angular/core';
import {SessionService} from "./session/session.service";
import {MetrikaService} from "./common/metrika.service";
import {CommonDataService} from "./common/common-data.service";
import {GarantService} from "./garant/garant.service";
import {DataService} from "./common/data-service";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {DocumentService} from "./garant/document.service";
import {NotifyService} from "./notify/notify.service";
import {LandingRequestService} from "./landing/landing.service";
import {WINDOW} from "./window/window.token";
import {WindowProvider} from "./window/window.provider";
import {HttpClientService} from "./base.service";
import {InterceptorsModule} from "../interceptors/interceptors.module";
// import {ConfirmationService} from "primeng/api/confirmationservice";
import {NewsService} from "./news/news.service";
import {ConfiguratorService} from "./configurator/configurator.service";
import {EventDataService} from "./event-data.service";
import {UsersService} from "./users/users.service";
import {ToastNotificationsService} from "./toast-notifications.service";
import {CookieService} from "ngx-cookie-service";


@NgModule({
  declarations: [],
  imports: [
    InterceptorsModule
  ],
  providers: [
    // {
    //   provide: SESSION_TOKEN,
    //   useClass: SessionService
    // },
    SessionService,
    // ConfirmationService,
    MessageService,
    NotifyService,
    {
      provide: APP_INITIALIZER,
      useFactory: (notifyService: NotifyService) => () => notifyService.initiateSignalrConnection(),
      deps: [NotifyService],
      multi: true,
    },
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
    ConfiguratorService,
    EventDataService,
    UsersService,
    CookieService,
    ToastNotificationsService
  ]
})
export class ServicesModule {
}
