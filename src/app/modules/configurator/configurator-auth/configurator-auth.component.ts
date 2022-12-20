import {HttpClient} from "@angular/common/http";
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {API_URL} from "src/app/core/core-urls/api-url";
import {ConfiguratorAuthInput} from "src/app/models/configurator/input/configurator-auth-input";

@Component({
  selector: "app-configurator-auth",
  templateUrl: "./configurator-auth.component.html",
  styleUrls: ["./configurator-auth.component.scss"]
})

/**
 * Класс модуля конфигуратора (авторизация).
 */
export class ConfiguratorAuthComponent {
  inputData: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {
  };

  /**
   * Функция авторизует сотрудника сервиса.
   * @param inputData - Данные для проверки. Email или телефон.
   * @param password - пароль.
   * @returns - Данные сотрудника.
   */
  public onAuthAsync(inputData: string, password: string) {
    let configuratorAuthInput = new ConfiguratorAuthInput();

    if (inputData !== "" && password !== "") {
      configuratorAuthInput.InputData = inputData;
      configuratorAuthInput.Password = password;
    }

    this.http.post(API_URL.apiUrl.concat("/configurator/login"), configuratorAuthInput)
      .subscribe((response: any) => {
        console.log("employee auth data:", response);

        // Если у сотрудника есть доступ.
        if (response.accessPanel == 1) {
          this.router.navigate(["/configurator/admin"]);
        }
      }, (err) => {
        throw new Error(err);
      });
  };
}
