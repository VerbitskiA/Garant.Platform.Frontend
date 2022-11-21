import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonDataService} from 'src/app/core/services/common/common-data.service';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from '@angular/router';
import {API_URL} from 'src/app/core/core-urls/api-url';
import {ConfirmEmailInput} from 'src/app/models/register/input/confirm-email-input';
import {FranchiseInput} from 'src/app/models/franchise/input/franchise-input';
import {NgForm} from "@angular/forms";
import {shareReplay, takeUntil, tap} from "rxjs/operators";
import {GarDestroyService} from "../../../gar-lib/gar-destroy.service";
import {
  CatalogShortCardComponent
} from "../../../modules/products/catalog/catalog.short.card/catalog.short.card.component";
import {PromoService} from "../../../core/services/promo/promo.service";
import {ENG} from "../../../strings/ENG/eng-string";
import {RU} from "../../../strings/RU/ru-strings";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [GarDestroyService],
  encapsulation: ViewEncapsulation.None
})

/**
 * Класс модуля главной страницы.
 */
export class MainPageComponent implements OnInit {
  responsiveOptions: any[] = [];
  isGarant: boolean = false;
  // rangeNumber: number = 0;
  rangeValues: number[] = [];
  routeParam: any;
  categoryListBusiness: any[] = [];
  categoryListFranchises: any[] = [];
  oSuggestion: any = {};
  aPopularFranchises: any[] = [];
  aAds: any[] = [];
  aBlogs: any[] = [];
  aFranchises: any[] = [];
  oTopAction: any = {};
  selectedCity: string = "";
  selectedCategory: string = "";
  selectedViewBusiness: string = "";
  cities: any[] = [];
  aCities: any[] = [];
  aBusinessCategories: any[] = [];
  aViewBusiness: any[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  view: string = "";
  city: string = "";
  category: string = "";
  aNewBusiness: any[] = [];
  showCategoryMenu: boolean = false;

  // public readonly mainPageString = RU.main_page;
  public readonly mainPageString = ENG.main_page;

  readonly aDataActions$ = this._promoService.actions$;
  readonly aPopularFranchises$ = this.commonService.getPopularFranchise().pipe(
    shareReplay(1),
    takeUntil(this._destroy$)
  )
  cardShortComponent = CatalogShortCardComponent;
  /**
   * список последних бизнесов
   * */
  readonly aNewBusiness$ = this.commonService.getNewBusiness().pipe(
    shareReplay(1),
    tap(data => console.log("Последний бизнес:", data)),
    takeUntil(this._destroy$)
  )

  constructor(
    private http: HttpClient,
    private _promoService: PromoService,
    private commonService: CommonDataService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private _destroy$: GarDestroyService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  };

  public ngOnInit() {
    // TODO: переделать на получение заголовка с бэка.
    this.titleService.setTitle("Gobizy: Сервис покупки и продажи франшиз");

    this.routeParam = this.route.snapshot.queryParams;
    console.log("routeParam", this.routeParam);

    if (this.routeParam.code !== "" && this.routeParam.code !== undefined && this.routeParam.code !== null) {
      this.confirmEmailAsync();
    }

    this.loadCategoriesListAsync();
    this.loadSingleSuggestionAsync();
    this.getPopularAsync();
    this.GetBlogsAsync();
    this.GetQuickFranchisesAsync();
    this.loadCitiesFranchisesListAsync();
    this.loadCategoriesFranchisesListAsync();
    this.loadViewBusinessFranchisesListAsync();
  };

  public showCategoryOnMobile(e: any) {
    e.target.closest('.title-franchise').nextElementSibling?.classList.toggle('d-block');
    e.target.closest('.title-franchise').lastElementChild?.classList.toggle('rotated');
  }

  /**
   * Функция проверит подтверждение почты.
   */
  private confirmEmailAsync() {
    let confirmInput = new ConfirmEmailInput();
    confirmInput.code = this.routeParam.code;

    this.http.post(API_URL.apiUrl.concat("/user/confirm-email"), confirmInput)
      .subscribe((response: any) => {
        console.log("Подтверждение почты:", response);

        if (response) {
          this.router.navigate(["/"]);
        }
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция получит список категорий.
   * @returns Список категорий.
   */
  private loadCategoriesListAsync() {
    this.commonService.loadCategoriesListAsync().subscribe((data: any) => {
      // TODO refactor backend structure, request will contain only 2 arrays for bussiness and franchises
      this.categoryListBusiness = [...data.resultCol1];
      this.categoryListFranchises = [...data.resultCol3];
    });
  };

  /**
   * Функция получит одно предложение с флагом IsSingle.
   * @returns данные предложения.
   */
  private loadSingleSuggestionAsync() {
    this.commonService.loadSingleSuggestionAsync().subscribe((data: any) => this.oSuggestion = data);
  };

  /**
   * Функция получит список популярныз франшиз.
   * @returns Список франшиз.
   */
  private getPopularAsync() {
    this.commonService.getPopularFranchise()
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => this.aPopularFranchises = data);
  };

  /**
   * Функция получит список блогов.
   * @returns Список блогов.
   */
  private GetBlogsAsync() {
    this.http.post(API_URL.apiUrl.concat("/blog/get-blogs"), {})
      .subscribe((response: any) => this.aBlogs = response, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция получит список франшиз для области быстрого поиска.
   * @returns Список франшиз.
   */
  private GetQuickFranchisesAsync() {
    this.http.post(API_URL.apiUrl.concat("/franchise/quick-franchises"), {})
      .subscribe((response: any) => this.aFranchises = response, (err) => {
        throw new Error(err);
      });
  };

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список городов франшиз.
   */
  private loadCitiesFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat("/main/cities-list"), {})
      .subscribe((response: any) => this.aCities = response, (err) => {
        throw new Error(err);
      });
  };

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список категорий бизнеса.
   */
  private loadCategoriesFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat("/main/business-categories-list"), {})
      .subscribe((response: any) => this.aBusinessCategories = response, (err) => {
        throw new Error(err);
      });
  };

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список видов бизнеса.
   */
  private loadViewBusinessFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat("/main/business-list"), {})
      .subscribe((response: any) => this.aViewBusiness = response, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция отфильтрует список франшиз по фильтрам.
   * @param viewCode - Код вида бизнеса.
   * @param categoryCode - Код категории бизнеса.
   * @param cityCode - Город бизнеса.
   * @param minPrice - Цена от.
   * @param maxPrice - Цена до.
   */
  public onFilterFranchisesAsync(form: NgForm) {
    console.log("onFilterFranchisesAsync", form);

    let filterInput = new FranchiseInput();
    filterInput.viewCode = form.value.view.viewCode;
    filterInput.cityCode = form.value.city.cityCode;
    filterInput.categoryCode = form.value.category.categoryCode;
    filterInput.minPrice = form.value.minPrice;
    filterInput.maxPrice = form.value.maxPrice;

    this.http.post(API_URL.apiUrl.concat("/main/filter"), filterInput)
      .subscribe((response: any) => this.aFranchises = response, (err) => {
        throw new Error(err);
      });
  };

  public onRoute(text: string) {
    if (text == "Продать") {
      this.router.navigate(["/ad/create"]);
      return;
    }
    if (text == "Начать") {
      return;
    }
    if (text == "Упаковать") {
      this.router.navigate(["/franchise/start"]);
      return;
    }
  };
}
