import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {API_URL} from "../../core-urls/api-url";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Session, SessionService} from "../session/session.service";
import SessionItems = Session.SessionItems;
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    // private messageService:
  ) {
  }

  // TODO: add models
  public login(loginInput: { password: string; email: string }): Observable<any> {
    return this.http.post(API_URL.apiUrl.concat("/user/login"), loginInput)
      .pipe(tap((res: any) => {
        if (res.token && res.isSuccess) {
          localStorage.setItem(SessionItems.token, res.token);
          this.sessionService.sessionEvent.next({init: true});
        }
      }));
  }
}
