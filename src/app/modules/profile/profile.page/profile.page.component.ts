import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from "primeng/api";
import {EventDataService} from "../../../core/services/event-data.service";
import {Window} from "../../../core/services/window/window.provider";
import GradeState = Window.GradeState;
import {CommonDataService} from "../../../core/services/common/common-data.service";
import {SessionService} from "../../../core/services/session/session.service";
import {API_URL} from "../../../core/core-urls/api-url";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile.page',
  templateUrl: './profile.page.component.html',
  styleUrls: ['./profile.page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit{
  public readonly gradeState = GradeState;

  public menuItems: MenuItem[] = [
    {label: 'Мои данные', icon: 'pi pi-user-edit'},
    {label: 'Мои сообщения', icon: 'pi pi-envelope'},
    {label: 'Мои объявления', icon: 'pi pi-clock'},
    {label: 'Мои сделки', icon: 'pi pi-briefcase'},
    {label: 'Избранное', icon: 'pi pi-bookmark'},
    {label: 'Уведомления', icon: 'pi pi-bell'},
    {label: 'Связь с юристом', icon: 'pi pi-lock', disabled: true},
    {label: 'Выход', icon: 'pi pi-sign-out', command: () => this._sessionService.sessionEvent.next({close: true})}
  ];
  private aProfileMenu: any;
  constructor(
    private http: HttpClient,
    private _sessionService: SessionService,
    public eventDataService: EventDataService,
    private commonDataService: CommonDataService,
    ) {

  }
  public ngOnInit(): void {
    // this.getProfileMenuAsync();

    this.http.post(`${API_URL.apiUrl}/user/profile-menu`, null).subscribe((data: any) => {
      console.log('!!!!! aProfileMenu', data)
      this.aProfileMenu = data;
    });
  }

  private getProfileMenuAsync() {
    this.commonDataService.getProfileMenuAsync().subscribe((data: any) => {
      console.log('!!!!! aProfileMenu', data)
      this.aProfileMenu = data;
    });
  };
}
