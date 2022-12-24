import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import UserModel = UserManagement.UserModel;
import {get} from "lodash";
import {CookieService} from "ngx-cookie-service";


export namespace UserManagement {
  interface BaseUserField {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
    role?: UserRole;
    approved?: boolean;


    city?: string;
    phoneNumber?: string;
    values?: string;
    userId?: string;
    dateBirth?: string;
    patronymic?: string;
    inn?: string;
    pc?: string;
    kpp?: string;
    bik?: string;
    passportSerial?: number;
    passportNumber?: number;
    dateGive?: string;
    whoGive?: string;
    code?: string;
    addressRegister?: string;
    documentName?: string;
    countTimeSite?: string;
    countAd?: number;
    defaultBankName?: string;
    corrAccountNumber?: string;
  }

  export interface UserModel extends BaseUserField {
    id?: string;
  }

  export interface UserPostModel extends BaseUserField {
  }

  export interface UserPutModel extends BaseUserField {
    id: string;
  }

  export enum UserRole {
    SUPER_ADMIN = 1,
    ADMIN,
    EDITOR,
    MODERATOR,
    USER
  }

  export const UserRoleString = {
    [UserRole.SUPER_ADMIN]: 'SUPER ADMIN',
    [UserRole.ADMIN]: 'ADMIN',
    [UserRole.EDITOR]: 'EDITOR',
    [UserRole.MODERATOR]: 'MODERATOR',
    [UserRole.USER]: 'USER'
  }

  export interface UserLoginModel {
    email: string;
    password: string;
  }

  export interface UserLoginResponseModel {
    access_token: string;
    token_type: string;
    expires_in: number;
  }

}


export namespace Session {
  // /** Сервис работы с текущей сессией */
  // export interface ISessionProvider {
  //   /** Инициализация сессии, выполняется при запуске приложения */
  //   initSession(): void;
  //   /** Старт сессии, выполняется при успешной авторизации/обновлении токена */
  //   startSession(): void;
  //   /** Окончание сессии, выполняется при логауте/протухании токена сессии и невозможности его обновить */
  //   endSession(): void;
  //   /** Сохранение абстрактных данных в хранилище (ключ/значение) */
  //   updateDataItem(key: string, value: string): void;
  //   /** Получение данных по ключу */
  //   getDataItem(key: string): string | null;
  //   /** Удаление данных по ключу */
  //   removeDataItem(key: string): void;
  //   /** Запись токена */
  //   setToken(token: { token: string }): void;
  //   /** Флаг проверки залогиненного юзера */
  //   isLogin$: Observable<boolean>;
  //   /** Проверка наличия accessToken */
  //   isUserHaveAccess: boolean;
  // }

  export enum SessionItems {
    token = 'token'
  }

  export interface TokenModel {
    token: string | any
  }

  export function tokenGetter() {
    return localStorage.getItem(SessionItems.token);
  }
}

// export const SESSION_TOKEN = new InjectionToken<Session.ISessionProvider>('SESSION_TOKEN');

@Injectable({providedIn: 'root'})
export class SessionService {
  public readonly sessionEvent: Subject<{ init?: boolean; update?: boolean; close?: boolean }> = new Subject<{ init?: boolean; update?: boolean; close?: boolean }>();

  public get isLogin(): boolean {
    return !!this.getToken();
  }

  public get userInfo(): UserModel {
    return this._userInfo;
  }

  public set userInfo(userData: UserModel) {
    this._userInfo = userData;
  }

  // public get userRoleString(): string {
  //   return this.userInfo?.role ? UserRoleString[this.userInfo?.role] : 'Not authorized';
  // }

  private _userInfo: UserModel;

  constructor(
    private _router: Router,
    private jwtService: JwtHelperService,
    private cs: CookieService
  ) {
    this._userInfo = {};
    this.sessionEvent.subscribe((value) => {
      if (value.init) {
        this.initSession();
      } else if (value.update) {
        this.updateSession();
      } else if (value.close) {
        this.closeSession();
      }
    });
    if (this.getToken()) {
      this.initSession();
    }
  }

  private initSession(): void {
    const decodedToken = this.jwtService.decodeToken();
    this.userInfo = decodedToken.user;
    // this.cs.set('Cookie', `user=${get(decodedToken, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name')}; .AspNetCore.Identity.Application=${this.getToken()}`, )
    // document.cookie = `user=${get(decodedToken, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name')}; .AspNetCore.Identity.Application=${this.getToken()}`;
    console.log('!!!! DECODED TOKEN !!!!', decodedToken, '  EXP  ', new Date(decodedToken.exp), '  nbf  ', new Date(decodedToken.nbf));
  }

  private decodeToken(): any {
    return this.jwtService.decodeToken();
  }

  private updateSession(): void {

  }

  private closeSession(): void {
    localStorage.removeItem(Session.SessionItems.token);
  }

  public getLoggedInUser(): UserModel {
    const decodedToken = this.jwtService.decodeToken();
    this.userInfo = decodedToken.user;
    return this.userInfo;
  }

  public getToken(): any {
    return this.jwtService.tokenGetter();
  }
}
