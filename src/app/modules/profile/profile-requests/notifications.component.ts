import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "src/app/core/core-urls/api-url";
import {GetRequestsModel} from "../../../models/request/get-requests.model";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"]
})

/**
 * Класс модуля уведомлений.
 */
export class NotificationsComponent implements OnInit {
  aNotifyData: any[] = [];

  constructor(private titleService: Title,
              private http: HttpClient) {

  };

  public ngOnInit() {
    // TODO: переделать на получение заголовка с бэка.
    this.titleService.setTitle("Gobizy: Мои уведомления");
    this.onGetBusinessRequestsAsync();
  };

  /**
   * Функция завершит регистрацию.
   */
  private onGetBusinessRequestsAsync() {
    console.log("onGetBusinessRequestsAsync");

    this.http.get<GetRequestsModel[]>(API_URL.apiUrl.concat("/request/get-requests"))
      .subscribe((response: any) => this.aNotifyData = response, (err) => {
        throw new Error(err);
      });
  };
}
