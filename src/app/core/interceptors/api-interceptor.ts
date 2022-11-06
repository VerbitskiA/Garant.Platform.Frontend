import {Inject, Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {CommonDataService} from "../services/common/common-data.service";
import {Session, SESSION_TOKEN, SessionService} from "../services/session/session.service";
import SessionItems = Session.SessionItems;

// Класс перехватчика api-запросов.
@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  constructor(
    @Inject(SESSION_TOKEN) private _sessionService: SessionService,
    private commonService: CommonDataService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    document.cookie = "geozone=" + this.commonService.getUserLocation();

    req = req.clone({
      headers: req.headers.set(
        "Authorization", `Bearer ${this._sessionService.getDataItem(SessionItems.token)}`
      ),

      // Если нужно отправлять куки с каждым запросом.
      withCredentials: true
    });

    // req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });

    // req = req.clone({ headers: req.headers.set('Accept', 'multipart/form-data') });

    // req = req.clone({ headers: req.headers.set('Content-Type', 'multipart/form-data') });

    // req = req.clone({ headers: req.headers.set('Content-Type', 'multipart/form-data;boundary="boundary"') });

    return next.handle(req).pipe(
      catchError(err => {
        this.commonService.routeToStart(err);

        return throwError(err.message);
      }));
  }
}
