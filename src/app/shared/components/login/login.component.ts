import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {API_URL} from "src/app/core/core-urls/api-url";
import {CheckCodeInput} from "src/app/models/login/input/check-code-input";
import {LoginInput} from "src/app/models/login/input/login-input";
import {TokenModel} from "../../../models";
import {SessionService} from "../../../core/services/session/session.service";
import {UsersService} from "../../../core/services/users/users.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})

/**
 * Класс модуля авторизации.
 */
export class LoginComponent implements OnInit {
  routeParam: number;
  isCode: boolean = false;
  isAuth: boolean = false;
  isPass: boolean = false;
  isGetCode: boolean = false;
  data: string = "";
  numOrEmail: string = "";
  pass: string = "";
  isHideBtnGetCode: boolean = false;
  code: string = "";
  type: any;
  time: number = 60;
  interval: any;
  play: boolean = false;
  isPolicyAgreement: boolean = false;
  isAdsEmail: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private usersService: UsersService,
    private titleService: Title,

    private _sessionService: SessionService
  ) {
    if (this._sessionService.isLogin){
      this.router.navigate(["/profile"]);
    }
    this.routeParam = this.route.snapshot.queryParams["loginType"];

    // Если вход по коду.
    if (this.route.snapshot.queryParams["loginType"] == "code") {
      this.isCode = true;
      this.isAuth = false;
      this.isPass = false;
    }

    // Если есть аккаунт.
    else if (this.route.snapshot.queryParams["loginType"] == "auth") {
      this.isAuth = true;
      this.isCode = false;
      this.isPass = false;
    }

    // Если вход по паролю.
    else if (this.route.snapshot.queryParams["loginType"] == "pass") {
      this.isAuth = false;
      this.isCode = false;
      this.isPass = true;
    }
  };

  public ngOnInit() {
    this.titleService.setTitle("Gobizy: Войти");
  };

  /**
   * Функция входа по аккаунту.
   */
  public onLoginByAccount() {
    this.isAuth = true;
    this.isCode = false;
    this.router.navigate(["/login"], {queryParams: {loginType: "auth"}});
  };

  /**
   * Функция входа по паролю.
   */
  public onLoginByPass() {
    this.isAuth = false;
    this.isCode = false;
    this.isPass = true;
    this.router.navigate(["/login"], {queryParams: {loginType: "pass"}});
  };

  /**
   * Функция авторизует пользователя.
   */
  public onLoginAsync(getByPassForm: NgForm) {
    let loginInput = new LoginInput();
    loginInput.email = getByPassForm.value.numOrEmail;
    loginInput.password = getByPassForm.value.pass;

    this.usersService.login(loginInput).subscribe((response: any) => {
        console.log("Авторизация:", response);
        if (response.isSuccess) {
          this.isGetCode = true;
          this.IsWriteProfileData(response.isWriteProfileData);
        }
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция получит код подтверждения.
   */
  public onGetCodeAsync(form: NgForm) {
    console.log("data", form.value.data);
    let inputData = new CheckCodeInput();
    inputData.data = form.value.data;
    inputData.data = this.data;

    this.http.post(API_URL.apiUrl.concat("/mailing/send-confirm-code"), inputData)
      .subscribe((response: any) => {
        this.time = 60
        this.startTimer();
        console.log("Код подтверждения:", response);
        if (response.isSuccessMailing) {
          this.isGetCode = true;
          this.isHideBtnGetCode = true;
          this.type = response.typeMailing;
          this.type = response;
        }
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция проверит код подтверждения.
   */
  public onCheckCodeAsync(form: NgForm) {
    let checkCodeInput = new CheckCodeInput();
    checkCodeInput.code = form.value.code;

    this.http.post<TokenModel>(API_URL.apiUrl.concat("/user/check-code"), checkCodeInput)
      .subscribe((response: any) => {
        console.log("Проверка кода подтверждения:", response);
        this.isGetCode = true;
        if (response.token && response.isSuccess) {
          // this._sessionService.setToken({[SessionItems.token]: response.token});
          // sessionStorage["user"] = response.user;
          // sessionStorage["isSuccess"] = response.isSuccess;
          this.pauseTimer();
          this.IsWriteProfileData(response.isWriteProfileData);
        }
      }, (err) => {
        throw new Error(err);
      });
  };

  public startTimer() {
    this.play = true;
    this.interval = setInterval(() => {
      if (this.time == 0) {
        this.pauseTimer();
        return;
      }

      this.time--;
    }, 1000)
  };

  public pauseTimer() {
    this.play = false;
    clearInterval(this.interval);
  };

  /**
   * Функция на основании проверки заполнял ли пользователь данные о себе редиректит либо на главную, либо на заполнение данных о себе.
   * @param flag - флаг проверки.
   */
  private IsWriteProfileData(flag: boolean) {
    console.log('!!! IsWriteProfileData', flag ? '/' : '/profile-data')
    if (flag) {
      this.router.navigate(["/"]);
      return;
    }
    this.router.navigate(["/profile-data"]);
  }

  public onToggle(prop: String) {
    if (prop === `changePolicyAgreement`) {
      this.isPolicyAgreement = !this.isPolicyAgreement;
    } else if (prop === `changeAdsEmail`) {
      this.isAdsEmail = !this.isAdsEmail;
    }
  }
}