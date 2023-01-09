import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonDataService} from 'src/app/core/services/common/common-data.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {SessionService} from "../../../core/services/session/session.service";
import {GarDestroyService} from "../../../gar-lib/gar-destroy.service";
import {DialogService} from "primeng/dynamicdialog";
import {MainSearchComponent} from "../main-search/main-search.component";
import {get} from "lodash";
import {LanguageService} from "../../../core/services/language/language.service";
import {LoginAndRegistrationComponent} from "../../../modules/login-and-registration/login-and-registration.component";

export namespace Header {
  export interface IItem {
    name: string;
    type: string;
    position: number;
  }

  export interface IHeaderItem {
    name: string;
    icon: string;
    link?: string;
    linkAction?: () => void;
  }

  export interface ISearchOption {
    name: string;
    type: string;
  }

  export const routerLink = {
    sel: '',

  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [GarDestroyService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Класс модуля хидера.
 */
export class HeaderComponent implements OnInit {
  public mainNavigationItems: MenuItem[] = [];
  public subNavigationItems: MenuItem[] = [];
  public readonly headerString = this.languageService.activeDictionary.header;

  constructor(
    private commonService: CommonDataService,
    private languageService: LanguageService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private _sessionService: SessionService,
    private _destroy$: GarDestroyService
  ) {
  }

  public moveToMainPage(): void {
    this.navigateAction('/');
  }

  private navigateAction(path: string, options?: NavigationExtras): void {
    this.router.navigate([path], options);
  }

  public ngOnInit() {
    this.initHeaderAsync();
    this.mainNavigationItems = this.createHeaderMenu();

    this.subNavigationItems = [
      {label: this.headerString.home, icon: 'pi pi-home', routerLink: '/main', routerLinkActiveOptions: {exact: true}},
      {
        label: this.headerString.franchises,
        icon: 'pi pi-sitemap',
        routerLink: '/catalog-franchise',
        routerLinkActiveOptions: {exact: true}
      },
      {
        label: this.headerString.readyMadeBusiness,
        icon: 'pi pi-briefcase',
        routerLink: '/catalog-business',
        routerLinkActiveOptions: {exact: true}
      },
      {
        label: this.headerString.buyingThroughAGuarantor,
        icon: 'pi pi-shield',
        routerLink: '/deal/start',
        routerLinkActiveOptions: {exact: true}
      },
      {
        label: this.headerString.consulting,
        icon: 'pi pi-box',
        routerLink: '/consulting/start',
        routerLinkActiveOptions: {exact: true}
      },
      {
        label: this.headerString.packingFranchises,
        icon: 'pi pi-cog',
        routerLink: '/franchise/start',
        routerLinkActiveOptions: {exact: true}
      },
    ];
  };

  private toLoginOrCabinetLink(): void {
    this.router.navigate(["/login"], {queryParams: {loginType: "code"}})
  }

  private createHeaderMenu(): MenuItem[] {
    return [
      ...[{label: this.headerString.search, icon: 'pi pi-search', command: () => this.showSearch()}],
      ...(this._sessionService.isLogin ? [
        {label: this.headerString.sell, icon: 'pi pi-megaphone', command: () => this.toLoginOrCabinetLink()},
        {label: this.headerString.myTrades, icon: 'pi pi-briefcase', command: () => this.toLoginOrCabinetLink()},
        {label: this.headerString.favorite, icon: 'pi pi-star', command: () => this.toLoginOrCabinetLink()},
        {label: this.headerString.notifications, icon: 'pi pi-bell', command: () => this.toLoginOrCabinetLink()},
        {label: this.headerString.account, icon: 'pi pi-user-edit', command: () => this.toLoginOrCabinetLink()},
      ] : []),
      ...(!this._sessionService.isLogin ? [
        {
          label: this.headerString.registration,
          icon: 'pi pi-user-plus',
          command: () => this.showLoginOrRegistration(false)
        },
        {label: this.headerString.logIn, icon: 'pi pi-user', command: () => this.showLoginOrRegistration(true)}
      ] : []),
      ...[{
        styleClass: 'item-in-row',
        icon: `country-flag country-flag-${this.languageService.activeLangVariant.langCode}`,
        tooltipOptions: {tooltipLabel: this.languageService.activeLangVariant.title, tooltipPosition: 'bottom'},
        items: Object.keys(this.languageService.langVariants).map((item) => {
          return {
            label: get(this.languageService.langVariants, item).title,
            styleClass: 'item-in-row',
            icon: `country-flag country-flag-${item}`,
            command: () => this.languageService.changeLang(get(this.languageService.langVariants, item))
          };
        })
      }]
    ];
  }

  private showSearch(): void {
    this.dialogService.open(MainSearchComponent, {
      showHeader: false,
      dismissableMask: true,
      width: '90%',
      height: '80%',
      position: 'top',
    }).onClose.subscribe((data) => {

    });
  }

  private showLoginOrRegistration(login: boolean): void {
    this.dialogService.open(LoginAndRegistrationComponent, {
      dismissableMask: true,
      width: '464px',
      data: {login}
    }).onClose.subscribe((data) => {

    });
  }

  /**
   * Функция получит поля хидера.
   */
  private initHeaderAsync() {
    this.commonService.initHeaderAsync("Main").subscribe((data: Header.IItem[]) => {
      console.warn('initHeaderAsync', data)
    });
  };

}
