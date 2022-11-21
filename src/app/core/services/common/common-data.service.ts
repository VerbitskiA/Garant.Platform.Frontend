import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {API_URL} from "../../core-urls/api-url";
import {DialogInput} from "../../../models/chat/input/dialog-input";
import {BreadcrumbInput} from "../../../models/header/breadcrumb-input";
import {MainHeader} from "../../../models/header/main-header";
import {SuggestionInput} from "../../../models/suggestion/input/suggestion-input";
import {TransitionInput} from "../../../models/transition/input/transition-input";
import {catchError, tap} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {Session, SESSION_TOKEN, SessionService} from "../session/session.service";
import SessionItems = Session.SessionItems;
import {TokenModel} from "../../../models/user/token.model";
import {InitHeaderModel} from "../../../models/user/init-header.model";
import {InitFooterModel} from "../../../models/user/init-footer.model";
import {CategoriesListModel} from "../../../models/mainPage/categories-list.model";
import {SingleSuggestionModel} from "../../../models/user/single-suggestion.model";
import {MainPopularModel} from "../../../models/franchise/main-popular.model";
import {PopularBusinessModel} from "../../../models/business/popular-business.model";
import {GetBreadcrumbsModel} from "../../../models/user/get-breadcrumbs.model";
import {GetTransitionModel} from "../../../models/user/get-transition.model";
import {CategoryListModel} from "../../../models/franchise/category-list.model";
import {SubcategoryListModel} from "../../../models/business/subcategory-list.model";
import {CitiesListModel} from "../../../models/business/cities-list.model";
import {ProfileMenuModel} from "../../../models/user/profile-menu.model";
import {DialogsModel} from "../../../models/chat/dialogs.model";
import {GetDialogModel} from "../../../models/chat/get-dialog.model";
import {GetBlogsModel} from "../../../models/blog/get-blogs.model";
import {NewBusinessModel} from "../../../models/business/new-business.model";

/**
 * Сервис общих функций.
 */
@Injectable()
export class CommonDataService {
  currentRoute: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(SESSION_TOKEN) private _sessionService: SessionService) {
    this.currentRoute = this.route.snapshot.queryParams;
  }

  // Функция отсчитывает время бездействия юзера, по окончании простоя убивает сессию и перенаправляет на стартовую для авторизации.
  // public deadlineSession(): void {
  //     let idleTime = 0;
  //
  //     $(document).ready(() => {
  //         //Increment the idle time counter every minute.
  //         let idleInterval = setInterval(timerIncrement, 60000); // 1 minute
  //
  //         //Zero the idle timer on mouse movement.
  //         $(this).mousemove((e: any) => idleTime = 0);
  //
  //         $(this).keypress((e: any) => idleTime = 0);
  //     });
  //
  //     const timerIncrement = () => {
  //         idleTime++;
  //
  //         if (idleTime > 19) { // 20 minutes
  //             this._sessionService.removeDataItem(SessionItems.token);
  //             sessionStorage.clear();
  //             localStorage.clear();
  //             // $(".right-panel").show();
  //             this.router.navigate(["/login?loginType=code"]);
  //         }
  //     }
  // };

  // Функция обновит токена пользователя.
  public refreshToken(): void {
    setInterval(async () => {
      if (!this._sessionService.getDataItem(SessionItems.token)) {
        // clearInterval(intervalID);
        clearInterval();
        return;
      }
      this.http.get<TokenModel>(API_URL.apiUrl.concat("/user/token"))
        .subscribe((response: any) => {
          const token = {[SessionItems.token]: response.token}
          this._sessionService.setToken(token)
          console.log("refresh token");
        }, (err) => {
          console.log(err);
          console.log('Ошибка обновления токена');
        });
    }, 530000); // Каждые 9 мин.
  };

  /**
   * Функция получит поля хидера.
   * @param type - тип хидера.
   */
  public initHeaderAsync<InitHeaderModel>(type: string): Observable<any> {
    let mainPage = new MainHeader();
    mainPage.Type = type;
    return this.http.post(API_URL.apiUrl.concat("/user/init-header"), mainPage)
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  public routeToStart(err: any) {
    if (err.status === 401) {
      this._sessionService.removeDataItem(SessionItems.token);
      sessionStorage.clear();

      this.router.navigate(["/login"], {queryParams: {loginType: "code"}});
    }
  };

  /**
   * Функция получит поля футера.
   */
  public initFooterAsync(): Observable<any> {
    return this.http.post<InitFooterModel>(API_URL.apiUrl.concat("/user/init-footer"), {})
      .pipe(
        tap((response) => {
          console.log("Данные футера:", response);
        }),
        catchError(val => of(new Error(val)))
      );
  };

  /**
   * Функция получит список категорий.
   * @returns Список категорий.
   */
  public loadCategoriesListAsync(): Observable<any> {
    return this.http.post<CategoriesListModel>(API_URL.apiUrl.concat("/main/categories-list"), {})
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  /**
   * Функция получит одно предложение с флагом IsSingle.
   * @returns данные предложения.
   */
  public loadSingleSuggestionAsync(): Observable<any> {
    let suggestionInput = new SuggestionInput();
    suggestionInput.isSingle = true;
    suggestionInput.isAll = false;
    return this.http.post<SingleSuggestionModel>(API_URL.apiUrl.concat("/user/single-suggestion"), suggestionInput)
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  /**
   * Функция получит список популярныз франшиз.
   * @returns Список франшиз.
   */
  public getPopularFranchise(): Observable<any> {
    return this.http.post<MainPopularModel>(API_URL.apiUrl.concat("/franchise/main-popular"), {}).pipe(
      catchError(err => throwError(err))
    )
  }

  public getPopularBusinessAsync(): Observable<any> {
    return this.http.post<PopularBusinessModel>(API_URL.apiUrl.concat("/business/popular-business"), {})
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  /**
   * Функция сформирует хлебные крошки страницы.
   * @returns - Список пунктов цепочки хлебных крошек.
   */
  public getBreadcrumbsAsync(selectorPage: string): Observable<any> {
    let inputBreadcrumb = new BreadcrumbInput();
    let param = "";
    if (selectorPage == "/franchise/create") {
      param = "create-franchise";
    }
    inputBreadcrumb.SelectorPage = param;
    return this.http.post<GetBreadcrumbsModel>(API_URL.apiUrl.concat("/user/get-breadcrumbs"), inputBreadcrumb)
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  /**
   * Функция запишет переход.
   * @param transitionType - тип перехода.
   * @param referenceId - Id франшизы или перехода.
   * @param otherId - Id другого пользователя.
   * @param typeItem - Тип предмета обсуждения.
   * @returns флаг успеха.
   */
  public setTransitionAsync(referenceId: number, transitionType: string, otherId: string, typeItem: string): Observable<any> {
    let transitionInput = new TransitionInput();
    transitionInput.ReferenceId = referenceId;
    transitionInput.TransitionType = transitionType;
    transitionInput.OtherId = otherId;
    transitionInput.TypeItem = typeItem;

    return this.http.post(API_URL.apiUrl.concat("/user/set-transition"), transitionInput)
      .pipe(tap((response) => response), catchError(err => {
        this.routeToStart(err);
        return of(new Error(err))
      }));
  };

  /**
   * Функция получит переход.
   * @returns Данные перехода.
   */
  public getTransitionAsync(currentRoute: any): Observable<any> {
    return this.http.post<GetTransitionModel>(API_URL.apiUrl.concat("/user/get-transition"), {})
      .pipe(tap((response) => response), catchError(err => {
        if (currentRoute.mode !== "view") {
          this.routeToStart(err);
          throw new Error(err);
        }
        return of(new Error(err))
      }));
  };

  /**
   * Функция получит переход по параметрам.
   * @returns Данные перехода.
   */
  public getTransitionWithParamsAsync(referenceId: number): Observable<any> {
    let transitionInput = new TransitionInput();
    transitionInput.ReferenceId = referenceId;
    return this.http.post<GetTransitionModel>(API_URL.apiUrl.concat("/user/get-transition-with-params"), transitionInput)
      .pipe(tap((response) => response), catchError(err => {
        this.routeToStart(err);
        return of(new Error(err))
      }));
  };

  /**
   * Функция получит список категорий франшиз.
   * @returns Список категорий.
   */
  public GetFranchiseCategoriesListAsync(): Observable<any> {
    if (this.router.url === "/ad/create") {
      return this.http.get<CategoryListModel>(API_URL.apiUrl.concat("/franchise/category-list-auth"))
        .pipe(tap((response) => response), catchError(err => of(new Error(err))));
    }
    return this.http.get<CategoryListModel>(API_URL.apiUrl.concat("/franchise/category-list"))
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  /**
   * Функция получит список подкатеорий франшиз.
   * @returns Список подкатеорий.
   */
  public GetFranchiseSubCategoriesListAsync(categoryCode: string, categorySysName: string): Observable<any> {
    return this.http.get(API_URL.apiUrl.concat(`/franchise/subcategory-list?categoryCode=${categoryCode}&categorySysName=${categorySysName}`))
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  /**
   * Функция получит список категорий бизнеса.
   * @returns Список категорий.
   */
  public GetBusinessCategoriesListAsync(): Observable<any> {
    return this.http.post<CategoryListModel>(API_URL.apiUrl.concat("/business/category-list"), {})
      .pipe(tap((response) => response), catchError((err) => {
        this.routeToStart(err);
        return of(new Error(err));
      }));
  };

  /**
   * Функция получит список подкатегорий бизнеса.
   * @returns Список подкатегорий.
   */
  public GetBusinessSubCategoriesListAsync(): Observable<any> {
    return this.http.post<SubcategoryListModel>(API_URL.apiUrl.concat("/business/subcategory-list"), {})
      .pipe(tap((response) => response), catchError((err) => {
        this.routeToStart(err);
        return of(new Error(err));
      }));
  };

  /**
   * Функция получит список городов бизнеса.
   * @returns Список городов.
   */
  public GetBusinessCitiesListAsync(): Observable<any> {
    return this.http.post<CitiesListModel>(API_URL.apiUrl.concat("/business/cities-list"), {})
      .pipe(tap((response) => response), catchError((err) => {
        this.routeToStart(err);
        return of(new Error(err));
      }));
  };

  /**
   * Функция получит список меню для ЛК.
   * @returns Список меню.
   */
  public getProfileMenuAsync() {
    return this.http.post<ProfileMenuModel>(API_URL.apiUrl.concat("/user/profile-menu"), {})
      .pipe(tap((response) => response), catchError(err => {
        this.routeToStart(err);
        return of(new Error(err))
      }));
  }

  /**
   * Функция получит список диалогов для текущего пользователя.
   * @returns Список диалогов.
   */
  public getDialogsAsync(): Observable<any> {
    return this.http.post<DialogsModel>(API_URL.apiUrl.concat("/chat/dialogs"), {})
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  /**
   * Функция получит список сообщений выбранного диалога.
   * @param dialogId - Id диалога.
   * @param typeItem - Тип предмета обсуждения.
   * @param ownerId - Id владельца/представителя..
   * @returns Список сообщений.
   */
  public getDialogMessagesAsync(dialogId: number, typeItem: string, ownerId: string): Observable<any> {
    let dialogInput = new DialogInput();

    if (dialogId <= 0) {
      dialogId = this.route.snapshot.queryParams["dialogId"];
    }

    dialogInput.DialogId = dialogId;
    dialogInput.TypeItem = typeItem;
    dialogInput.OwnerId = ownerId;

    return this.http.post<GetDialogModel>(API_URL.apiUrl.concat("/chat/get-dialog"), dialogInput)
      .pipe(tap((response) => response), catchError(err => {
        this.routeToStart(err);
        return of(new Error(err));
      }));
  }

  public onGetBlogsAsync(): Observable<any> {
    return this.http.post<GetBlogsModel>(API_URL.apiUrl.concat("/blog/get-blogs"), {})
      .pipe(tap((response) => response), catchError(err => {
        this.routeToStart(err);
        return of(new Error(err));
      }));
  };

  /**
   * Функция уберет пробелы в числе, которое в строке.
   * @param value - Входное значение в строке, у которого нужно убрать пробелы.
   * @returns - Число без пробелов.
   */
  public TrimSpaceInNumber(value: string) {
    return value.replace(/\s/g, "");
  };

  /**
   * Функция вернет регион пользователя.
   * @returns - Страна пользователя.
   */
  public getUserLocation(): string {
    return window.navigator.language.substr(0, 2).toLowerCase();
  };

  public getNewBusiness(): Observable<any> {
    return this.http.post<NewBusinessModel>(API_URL.apiUrl.concat("/business/new-business"), {}).pipe(
      catchError(err => throwError(err))
    );
  }

  public getNewBusinessAsync(): Observable<any> {
    return this.http.post<NewBusinessModel>(API_URL.apiUrl.concat("/business/new-business"), {}).pipe(
      catchError(err => throwError(err))
    );
  }
}
