import {Injectable, InjectionToken} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {map, shareReplay, tap} from 'rxjs/operators';
import {Router} from "@angular/router";


export namespace Session {
  /** Сервис работы с текущей сессией */
  export interface ISessionProvider {
    /** Инициализация сессии, выполняется при запуске приложения */
    initSession(): void;
    /** Старт сессии, выполняется при успешной авторизации/обновлении токена */
    startSession(): void;
    /** Окончание сессии, выполняется при логауте/протухании токена сессии и невозможности его обновить */
    endSession(): void;
    /** Сохранение абстрактных данных в хранилище (ключ/значение) */
    updateDataItem(key: string, value: string): void;
    /** Получение данных по ключу */
    getDataItem(key: string): string | null;
    /** Удаление данных по ключу */
    removeDataItem(key: string): void;
    /** Запись токена */
    setToken(token: { token: string }): void;
    /** Флаг проверки залогиненного юзера */
    isLogin$: Observable<boolean>;
    /** Проверка наличия accessToken */
    isUserHaveAccess: boolean;
  }

  export enum SessionItems {
    token = 'token'
  }

  export interface TokenModel {
    token: string | any
  }
}
export const SESSION_TOKEN = new InjectionToken<Session.ISessionProvider>('SESSION_TOKEN');

@Injectable()
export class SessionService implements Session.ISessionProvider {
  private _token$: BehaviorSubject<Session.TokenModel> = new BehaviorSubject({token: null});

  public readonly isLogin$ = this._token$.pipe(
    map(t => !!t.token),
    shareReplay({refCount: false, bufferSize: 1}),
    // takeUntil(this)
  );

  public get isUserHaveAccess(): boolean {
    //на будущее
    return true;
  };

  constructor(
    private _router: Router
  ) {
    this._token$.next({[Session.SessionItems.token]: this.getDataItem(Session.SessionItems.token)});
    this._token$.pipe(
      tap(token => {
        if (token?.token) {
          this.updateDataItem(Session.SessionItems.token, token.token)
        } else {
          this.removeDataItem(Session.SessionItems.token)
        }
      }),
      // takeUntil(this)
    ).subscribe()
  }

  public endSession(): void {
    this._token$.next({[Session.SessionItems.token]: null});
    this._router.navigate(['/'])
  }

  public initSession(): void {
    // на будущее
  }

  public startSession(): void {
    // на будущее
  }

  public getDataItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public removeDataItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public updateDataItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public setToken(token: { token: string }): void {
    this._token$.next(token)
  }

}
