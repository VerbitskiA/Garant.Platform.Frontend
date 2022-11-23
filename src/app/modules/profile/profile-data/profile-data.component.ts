import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "src/app/core/core-urls/api-url";
import {RegisterInput} from "src/app/models/register/input/register-input";
import {MessageService} from "primeng/api";
import {CommonDataService} from "src/app/core/services/common/common-data.service";
import {SaveProfileInfoModel} from "../../../models/user/save-profile-info.model";

@Component({
  selector: "app-profile-data",
  templateUrl: "./profile-data.component.html",
  styleUrls: ["./profile-data.component.scss"]
})

/**
 * Класс модуля профиля пользователя.
 */
export class ProfileDataComponent implements OnInit {
  firstName: string = "";
  city: string = "";
  lastName: string = "";
  email: string = "";
  pass: string = "";
  selectedValues: any[] = [];
  aProfileMenu: any = [];

  constructor(private titleService: Title,
              private http: HttpClient,
              private messageService: MessageService,
              private commonService: CommonDataService) {

  };

  public ngOnInit() {
    this.email = sessionStorage["user"];
    // TODO: переделать на получение заголовка с бэка.
    this.email = sessionStorage["user"];
    this.titleService.setTitle("Gobizy: Заполнение информации о себе");

    this.getProfileMenuAsync();
  };

  public onChangeDataValue() {
    console.log("selectedValues", this.selectedValues);
  };

  /**
   * Функция завершит регистрацию.
   */
  public  onSaveRegisterAsync(form: NgForm) {
    console.log("onSaveRegisterAsync", form);
    let regInput = new RegisterInput();
    regInput.firstName = form.value.firstName;
    regInput.lastName = form.value.lastName;
    regInput.city = form.value.city;
    regInput.password = form.value.pass;
    regInput.email = form.value.email;
    regInput.values = this.selectedValues.join();

    this.http.post<SaveProfileInfoModel>(API_URL.apiUrl.concat("/user/save-user-info"), regInput)
      .subscribe(
        (response: any) => this.messageService.add({severity: 'success',summary: 'Успешно!',detail: 'Данные о себе успешно сохранены'}),
        (err) => {
        throw new Error(err);
      });
  };

  private getProfileMenuAsync() {
    this.commonService.getProfileMenuAsync().subscribe((data: any) => this.aProfileMenu = data);
  };
}
