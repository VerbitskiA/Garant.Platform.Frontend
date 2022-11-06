import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {API_URL} from 'src/app/core/core-urls/api-url';
import {FilterBusinessWithPaginationInput} from 'src/app/models/business/input/filter-business-with-pagination-input';
import {PaginationInput} from 'src/app/models/pagination/input/pagination-input';
import {CommonDataService} from 'src/app/core/services/common/common-data.service';
import {CatalogShortCardComponent} from "../../products/catalog/catalog.short.card/catalog.short.card.component";

@Component({
  selector: "app-catalog-business",
  templateUrl: "./catalog-business.component.html",
  styleUrls: ["./catalog-business.component.scss"]
})

/**
 * Класс модуля каталога бизнеса.
 */
export class CatalogBusinessComponent implements OnInit {
  aPopularBusiness: any[] = [];
  isGarant: boolean = false;
  aCities: any[] = [];
  aBusinessCategories: any[] = [];
  aViewBusiness: any[] = [];
  minPrice!: number;
  maxPrice!: number;
  minProfit!: number;
  maxProfit!: number;
  view: string = '';
  city: string = '';
  category: string = '';
  selectedCity: string = '';
  selectedCategory: any = '';
  selectedViewBusiness: any;
  aBusinessList: any[] = [];
  selectedSort: any = '';
  aSortPrices: any[] = [];
  filterMinPrice!: number;
  filterMaxPrice!: number;
  countTotalPage!: number;
  countBusinesses!: number;
  aRowsPerPageOptions: number[] = [10, 20, 30];
  selectedCountRows: number = 10;
  aBlogs: any[] = [];
  aNews: any[] = [];
  categoryList1: any[] = [];
  categoryList2: any[] = [];
  categoryList3: any[] = [];
  categoryList4: any[] = [];
  aDataActions: any[] = [];
  oTopAction: any = {};
  oSuggestion: any = {};
  aNewFranchises: any[] = [];
  responsiveOptions: any[] = [];
  aReviewsFranchises: any[] = [];
  businessId: number = 0;
  routeParam: number;
  isHideBusinessWithGarant: boolean = true;
  filterRang: number[] = [20, 80];
  rangValue: number[] = [20, 80];

  cardComponent = CatalogShortCardComponent;

  constructor(
    private http: HttpClient,
    private commonService: CommonDataService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.aSortPrices = [
      {name: 'По убыванию цены', value: 'Desc',},
      {name: 'По возрастанию цены', value: 'Asc',},
    ];

    this.responsiveOptions = [
      {breakpoint: '1024px', numVisible: 3, numScroll: 3,},
      {breakpoint: '768px', numVisible: 2, numScroll: 2,},
      {breakpoint: '560px', numVisible: 1, numScroll: 1,},
    ];

    this.routeParam = this.route.snapshot.queryParams['businessId'];
  }

  public ngOnInit() {
    this.getPopularBusinessAsync();
    this.GetBusinessListAsync();
    this.loadCitiesFranchisesListAsync();
    this.loadCategoriesFranchisesListAsync();
    this.loadViewBusinessFranchisesListAsync();
    this.loadPaginationInitAsync();
    this.GetActionsAsync();
    this.GetBlogsAsync();
    this.GetNewsTopAsync();
    this.loadCategoriesListAsync();
    this.loadSingleSuggestionAsync();
    this.GetNewFranchisesListAsync();
    //  this.GetReviewsFranchisesAsync();
  }

  /**
   * Функция получит список популярного бизнеса.
   * @returns Список бизнеса.
   */
  private getPopularBusinessAsync() {
    this.commonService.getPopularBusinessAsync().subscribe((data: any) => this.aPopularBusiness = data);
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список бизнеса.
   */
  private GetBusinessListAsync() {
    //TODO: Возможно не используется
    this.http.post(API_URL.apiUrl.concat('/business/catalog-business'), {})
      .subscribe((response: any) => this.aBusinessList = response, (err) => {
        throw new Error(err);
      });
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список городов бизнеса.
   */
  private loadCitiesFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat('/business/cities-list'), {})
      .subscribe((response: any) => this.aCities = response, (err) => {
        throw new Error(err);
      });
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список категорий бизнеса.
   */
  private loadCategoriesFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat('/business/category-list'), {})
      .subscribe((response: any) => this.aBusinessCategories = response, (err) => {
        throw new Error(err);
      });
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список видов бизнеса.
   */
  private loadViewBusinessFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat('/main/business-list'), {})
      .subscribe((response: any) => this.aViewBusiness = response, (err) => {
        throw new Error(err);
      });
  }

  public onPaginationChangeAsync(event: any) {
    let filterInput = new FilterBusinessWithPaginationInput();
    filterInput.TypeSortPrice = this.selectedSort.value;
    filterInput.MinProfit = this.minProfit;
    filterInput.MaxProfit = this.maxProfit;
    filterInput.City = this.city;
    filterInput.CategoryCode = this.selectedCategory.categoryCode;
    filterInput.MinPrice = this.minPrice;
    filterInput.MaxPrice = this.maxPrice;
    filterInput.IsGarant = this.isGarant;
    filterInput.PageNumber = event.page + 1;
    filterInput.CountRows = event.rows;

    this.selectedCountRows = event.rows;
    this.http.post(API_URL.apiUrl.concat('/business/filter-pagination'), filterInput)
      .subscribe((response: any) => {
        this.aBusinessList = response.results;
        this.countBusinesses = response.countAll;
        this.countTotalPage = response.countAll;
      }, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  }

  private loadPaginationInitAsync() {
    let paginationData = new PaginationInput();
    // TODO: доработать на динамическое получение из роута или как-нибудь еще, чтобы помнить, что выбирал пользователь.
    paginationData.PageNumber = 1;
    this.http.post(API_URL.apiUrl.concat('/pagination/init-catalog-business'), paginationData)
      .subscribe((response: any) => {
        console.log('pagination init', response);
        this.countBusinesses = response.countAll;
        this.aBusinessList = response.results;
        this.countTotalPage = response.countAll;
      }, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  }

  public onChangeSortPrice() {
    console.log('onChangeSortPrice', this.selectedSort);
  }

  /**
   * Функция фильтрует бизнесы по параметрам с учётом пагинации.
   * @returns - Список бизнесов после фильтрации с учётом пагинации.
   */
  public onFilterBusinessesWithPaginationAsync() {
    let filterInput = new FilterBusinessWithPaginationInput();
    filterInput.TypeSortPrice = this.selectedSort.value;
    filterInput.MinProfit = this.minProfit;
    filterInput.MaxProfit = this.maxProfit;
    filterInput.City = this.city;
    filterInput.CategoryCode = this.selectedCategory.categoryCode;
    filterInput.MinPrice = this.minPrice;
    filterInput.MaxPrice = this.maxPrice;
    filterInput.IsGarant = this.isGarant;
    filterInput.PageNumber = 1;
    filterInput.CountRows = this.selectedCountRows;

    this.http.post(API_URL.apiUrl.concat('/business/filter-pagination'), filterInput)
      .subscribe((response: any) => {
        console.log('Бизнеса после фильтрации:', response);
        this.aBusinessList = response.results;
        this.countBusinesses = response.countAll;
        this.countTotalPage = response.countAll;
      }, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  }

  public onClearFilters() {
    //TODO: После сброса числовые значения устанавливаются в ноль: нужно выводить плейсхолдеры вместо нулей
    //и запретить пользователю отправлять "пустые" значения цен и прибыли. Этого можно добиться, если сначала ввести
    // а затем руками стереть значение.

    this.isGarant = true;
    this.selectedCategory = '';
    this.selectedSort = '';
    this.selectedCity = '';
    this.maxPrice = 0;
    this.minPrice = 0;
    this.minProfit = 0;
    this.maxProfit = 0;

    this.loadPaginationInitAsync();
  }

  /**
   * Функция получит данные для блока событий.
   */
  private GetActionsAsync() {
    this.http.post(API_URL.apiUrl.concat("/main/actions"), {})
      .subscribe((response: any) => this.aDataActions = response.filter((el: any) => !el.isTop), (err) => {
        throw new Error(err);
      });
  }

  /**
   * Функция получит список блогов.
   * @returns Список блогов.
   */
  private GetBlogsAsync() {
    this.http.post(API_URL.apiUrl.concat('/blog/main-blogs'), {})
      .subscribe((response: any) => this.aBlogs = response, (err) => {
        throw new Error(err);
      });
  }

  /**
   * Функция получит список проплаченных новостей.
   * @returns Список новостей.
   */
  private GetNewsTopAsync() {
    this.http.post(API_URL.apiUrl.concat('/blog/get-news'), {})
      .subscribe((response: any) => this.aNews = response, (err) => {
        throw new Error(err);
      });
  }

  /**
   * Функция получит список категорий.
   * @returns Список категорий.
   */
  private loadCategoriesListAsync() {
    this.commonService.loadCategoriesListAsync().subscribe((data: any) => {
      this.categoryList1 = data.resultCol1;
      this.categoryList2 = data.resultCol2;
      this.categoryList3 = data.resultCol3;
      this.categoryList4 = data.resultCol4;
    });
  }

  /**
   * Функция получит одно предложение с флагом IsSingle.
   * @returns данные предложения.
   */
  private loadSingleSuggestionAsync() {
    this.commonService.loadSingleSuggestionAsync().subscribe((data: any) => this.oSuggestion = data);
  }

  /**
   * Функция получит список новых франшиз.
   * @returns Список франшиз.
   */
  private GetNewFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat('/franchise/new-franchise'), {})
      .subscribe((response: any) => this.aNewFranchises = response, (err) => {
        throw new Error(err);
      });
  }

  // private  GetReviewsFranchisesAsync() {
  //     try {
  //          this.http.post(API_URL.apiUrl.concat("/franchise/review"), {})
  //             .subscribe({
  //                 next: (response: any) => {
  //                     console.log("Отзывы:", response);
  //                     this.aReviewsFranchises = response;
  //                 },

  //                 error: (err) => {
  //                     throw new Error(err);
  //                 }
  //             });
  //     }

  //     catch (e: any) {
  //         throw new Error(e);
  //     }
  // };

  /**
   * Функция запишет переход.
   */
  private setTransitionAsync(businessId: number) {
    this.commonService.setTransitionAsync(businessId, 'Business', '', '')
      .subscribe((data: any) => console.log('Переход записан:', data));
  }

  /**
   * Функция перейдет к просмотру карточки бизнеса.
   */
  public routeViewFranchiseCardAsync(businessId: number) {
    this.setTransitionAsync(businessId);
    this.router.navigate(['/business/view'], {queryParams: {businessId: businessId}});
  }
}
