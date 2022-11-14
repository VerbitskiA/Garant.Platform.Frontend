import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {CommonDataService} from 'src/app/core/services/common/common-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {SESSION_TOKEN, SessionService} from "../../../core/services/session/session.service";
import {filter, map, shareReplay, takeUntil} from "rxjs/operators";
import {GarDestroyService} from "../../../gar-lib/gar-destroy.service";
import {RU} from "../../../strings/RU/ru-strings";
import {ENG} from "../../../strings/ENG/eng-string";

export namespace Header {
  export interface IItem {
    name: string;
    type: string;
    position: number;
  }

  export interface IHeaderItem {
    name: string;
    icon: string;
    link: string;
  }

  export interface ISearchOption {
    name: string;
    type: string;
  }
}

  //const cabinetString = RU.cabinet_links;
  const cabinetString = ENG.cabinet_links;

const CABINET_LINKS: Header.IHeaderItem[] = [
  // {name: 'Продать', icon: 'cabinet-megaphone', link: '/'},
   {name: cabinetString.sell, icon: 'cabinet-megaphone', link: '/'},
  // {name: 'Мои сделки', icon: 'cabinet-deal', link: '/'},
  {name: cabinetString.myDeals, icon: 'cabinet-deal', link: '/'},
  // {name: 'Избранное', icon: 'cabinet-star', link: '/'},
  {name: cabinetString.favorites, icon: 'cabinet-star', link: '/'},
  // {name: 'Уведомления', icon: 'cabinet-bell', link: '/'},
  {name: cabinetString.notifications, icon: 'cabinet-bell', link: '/'},
]

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [GarDestroyService]
})

/**
 * Класс модуля хидера.
 */
export class HeaderComponent implements OnInit {
  private _aHeader$ = new BehaviorSubject<Header.IItem[] | null>(null);

  public aHeader$: Observable<Header.IItem[] | null> = combineLatest([this._sessionService.isLogin$, this._aHeader$]).pipe(
    filter(([isLogin, aHeader]) => !!aHeader?.length),
    map(([isLogin, aHeader]) => {
      return !isLogin ? aHeader : aHeader!.filter(h => h.name !== 'Вход или регистрация')
    }),
    shareReplay({refCount: true, bufferSize: 1}),
    takeUntil(this._destroy$)
  )

  aBreadcrumbs: any[] = [];
  routeParam: any;
  searchText: string = "";
  searchOptions: Header.ISearchOption[];
  selectedSearchOption: Header.ISearchOption;
  isGarant: boolean = false;
  items!: MenuItem[];
  isMenuHidden: boolean = true;

  //public readonly headerString = RU.header;
  public readonly headerString = ENG.header; // добавил header на английском)

  categories: Header.IHeaderItem[] = [
    // {name: 'Главная', icon: 'category-home', link: '/'},
    {name: this.headerString.home, icon: 'category-home', link: '/'},
    // {name: 'Франшизы', icon: 'category-franchise', link: '/catalog-franchise'},
    {name: this.headerString.franchises, icon: 'category-franchise', link: '/catalog-franchise'},
    // {name: 'Готовый бизнес', icon: 'category-business', link: '/catalog-business'},
    {name: this.headerString.readyMadeBusiness, icon: 'category-business', link: '/catalog-business'},
    // {name: 'Покупка через гарант', icon: 'category-deal', link: '/deal/start'},
    {name: this.headerString.buyingThroughAGuarantor, icon: 'category-deal', link: '/deal/start'},
    // {name: 'Консалтинг', icon: 'category-consulting', link: '/consulting/start'},
    {name: this.headerString.consulting, icon: 'category-consulting', link: '/consulting/start'},
    // {name: 'Упаковка франшиз', icon: 'category-franchise-start', link: '/franchise/start'}
    {name: this.headerString.packingFranchises, icon: 'category-franchise-start', link: '/franchise/start'}
  ];

  readonly cabinetLinks$: Observable<Header.IHeaderItem[]> = this._sessionService.isLogin$.pipe(
    map(isLogin => [...CABINET_LINKS, {
      // name: isLogin ? 'Аккаунт' : 'Войти',
      name: isLogin ? cabinetString.account : cabinetString.logIn,
      icon: 'cabinet-profile',
      link: '/profile/my-data'
    }]),
    shareReplay({refCount: true, bufferSize: 1}),
    takeUntil(this._destroy$)
  );

  constructor(
    private commonService: CommonDataService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(SESSION_TOKEN)
    private _sessionService: SessionService,
    private _destroy$: GarDestroyService
  ) {
    this.searchOptions = [
      {name: 'франшиза', type: 'franchise'},
      {name: 'бизнес', type: 'business'}
    ];

    this.selectedSearchOption = this.searchOptions[0];

    this.items = [
      {label: 'Подтверждение продажи'},
      {label: 'Согласование этапов сделки'},
      {label: 'Согласование договора'},
      {label: 'Оплата и исполнение этапов сделки'}
    ];

    this.routeParam = this.route.snapshot.queryParams;
  };

  ngDoCheck() {
    this.isGarant = window.location.href.includes("stage");

    if (this.isMenuHidden) {
      document.body.classList.remove('no-overflow');
    } else {
      document.body.classList.add('no-overflow');
    }
  }

  public ngOnInit() {
    this.initHeaderAsync();
    this.commonService.refreshToken();
    this.getBreadcrumbsAsync();
    this.items = [{label: 'Step 1'}, {label: 'Step 2'}, {label: 'Step 3'}];
  };

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  onResize() {
  }

  public toggleMenu(show: boolean): void {
    this.isMenuHidden = !show;
  }

  /**
   * Функция получит поля хидера.
   */
  private initHeaderAsync() {
    this.commonService.initHeaderAsync("Main").subscribe((data: Header.IItem[]) => this._aHeader$.next(data) );
  };

  /**
   * Функция распределит роуты по пунктам хидера.
   * @param name - параметр роута с названием пункта.
   */
  // TODO refactor onGetMenuHeader method
  public onGetMenuHeader(name: string) {
    switch (name) {
      case "Вход или регистрация":
        this.router.navigate(["/login"], {queryParams: {loginType: "code"}});
        break;

      // Переход к созданию объявления.
      case "Разместить объявление":
        this.router.navigate(["/ad/create"]);
        break;
    }
  };

  /**
   * Функция сформирует хлебные крошки страницы.
   * @returns - Список пунктов цепочки хлебных крошек.
   */
  private getBreadcrumbsAsync() {
    this.commonService.getBreadcrumbsAsync(this.router.url).subscribe((data: any) => this.aBreadcrumbs = data);
  };

  public onRouteSearch(searchText: string) {
    this.router.navigate(["/search"], {
      queryParams: {
        searchType: this.selectedSearchOption.type,
        searchText: searchText
      }
    });
  };
}
