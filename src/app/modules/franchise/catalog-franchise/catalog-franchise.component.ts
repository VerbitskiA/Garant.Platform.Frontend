import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {API_URL} from 'src/app/core/core-urls/api-url';
import {
  FilterFranchiseWithPaginationInput
} from 'src/app/models/franchise/input/filter-franchise-with-pagination-input';
import {PaginationInput} from 'src/app/models/pagination/input/pagination-input';
import {CommonDataService} from 'src/app/core/services/common/common-data.service';
import {shareReplay, takeUntil, tap} from 'rxjs/operators';
import {CatalogShortCardComponent} from "../../products/catalog/catalog.short.card/catalog.short.card.component";
import {GarDestroyService} from "../../../gar-lib/gar-destroy.service";
import {CatalogFranchiseModel} from "../../../models/franchise/catalog-franchise.model";
import {CitiesListModel} from "../../../models/mainPage/cities-list.model";
import {BusinessListModel} from "../../../models/mainPage/business-list.model";
import {InitCatalogFranchiseResponse} from "../../../models/pagination/init-catalog-franchise";
import {ActionsModel} from "../../../models/mainPage/actions.model";

interface CardData {
  id?: string
  name?: string
  description?: string
  price?: string
  img?:string
}


@Component({
  selector: 'app-catalog-franchise',
  templateUrl: './catalog-franchise.component.html',
  styleUrls: ['./catalog-franchise.component.scss'],
  providers: [GarDestroyService]
})

/**
 * Класс модуля каталога франшиз.
 */
export class CatalogFranchiseComponent implements OnInit {
  aPopularFranchises: any[] = [];
  isGarant: boolean = false;
  aCities: any[] = [];
  aBusinessCategories: any[] = [];
  aViewBusiness: any[] = [];
  minPrice!: number;
  maxPrice!: number;
  view: string = '';
  city: string = '';
  category: string = '';
  selectedCity: string = '';
  selectedCategory: any = '';
  selectedViewBusiness: any = '';
  aFranchises: any[] = [];
  selectedSort: any = '';
  aSortPrices: any[] = [];
  filterMinPrice!: number;
  filterMaxPrice!: number;
  countTotalPage: number = 0;
  aRowsPerPageOptions: number[] = [12, 21, 30];
  selectedCountRows: number = 12;
  countFranchises!: number;
  aBlogs: any[] = [];
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
  franchiseId: number = 0;
  routeParam: number;
  isHideBusinessWithGarant: boolean = true;
  catFranchPagination: any;
  pageNumber: number = 1;
  countRows: number = 12;

  /** Компонент, передаваемый в карусель */
  cardComponent = CatalogShortCardComponent;
  /** список популярных франшиз */
  readonly aPopularFranchises$ = this.commonService.getPopularFranchise().pipe(
    shareReplay(1),
    tap(data => console.log('Популярные франшизы:', data)),
    takeUntil(this._destroy$)
  )

  constructor(
    private http: HttpClient,
    private commonService: CommonDataService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private _destroy$: GarDestroyService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1430px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '733px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    // TODO: Переделать на хранение на бэке.
    this.aSortPrices = [
      {name: 'По убыванию цены', value: 'Desc',},
      {name: 'По возрастанию цены', value: 'Asc',},
    ];
    this.routeParam = this.route.snapshot.queryParams['franchiseId'];
  }

  public ngOnInit() {
    this.titleService.setTitle('Gobizy: Каталог франшиз');
    //TODO: Возможно вызов не нужен, франшизы грузятся при ините пагинации.
    //await this.GetFranchisesListAsync();
    //await this.loadCitiesFranchisesListAsync();
    this.loadCategoriesFranchisesListAsync();
    this.loadViewBusinessFranchisesListAsync();
    this.loadPaginationInitAsync();
    // this.getCatFranchPagination()
    this.GetActionsAsync();
    this.GetBlogsAsync();
    this.loadCategoriesListAsync();
    this.loadSingleSuggestionAsync();
    this.GetNewFranchisesListAsync();
    this.GetReviewsFranchisesAsync();
  }

  /**
   * TODO: вынести в общий сервис.
   * Функция получит список франшиз.
   */
  private GetFranchisesListAsync() {
    this.http.post<CatalogFranchiseModel>(API_URL.apiUrl.concat('/franchise/catalog-franchise'), {})
      .subscribe((response: any) => {
        this.aFranchises = response;
        this.countTotalPage = response.length;
        console.log('Список франшиз:', response);
        console.log('Кол-во франшиз:', this.countTotalPage);
      }, (err) => {
        throw new Error(err);
      });
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список городов франшиз.
   */
  private loadCitiesFranchisesListAsync() {
    this.http.post<CitiesListModel>(API_URL.apiUrl.concat('/main/cities-list'), {})
      .subscribe((response: any) => this.aCities = response, (err) => {
        throw new Error(err);
      });
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список категорий бизнеса.
   */
  private loadCategoriesFranchisesListAsync() {
    this.http.post<CitiesListModel>(API_URL.apiUrl.concat('/main/business-categories-list'), {})
      .subscribe((response: any) => this.aBusinessCategories = response, (err) => {
        throw new Error(err);
      });
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список видов бизнеса.
   */
  private loadViewBusinessFranchisesListAsync() {
    this.http.post<BusinessListModel>(API_URL.apiUrl.concat('/main/business-list'), {})
      .subscribe((response: any) => this.aViewBusiness = response, (err) => {
        throw new Error(err);
      });
  }

  public onPaginationChangeAsync(event: any) {
    let filterInput = new FilterFranchiseWithPaginationInput();
    filterInput.TypeSortPrice = this.selectedSort.value;
    filterInput.MinProfit = this.filterMinPrice;
    filterInput.MaxProfit = this.filterMaxPrice;
    filterInput.ViewCode = this.selectedViewBusiness.viewCode;
    filterInput.CategoryCode = this.selectedCategory.categoryCode;
    filterInput.MinInvest = this.minPrice;
    filterInput.MaxInvest = this.maxPrice;
    filterInput.IsGarant = this.isGarant;
    filterInput.PageNumber = event.page + 1;
    filterInput.CountRows = event.rows;
    this.selectedCountRows = event.rows;
    console.log('rows', event.rows);
    this.http.post<CatalogFranchiseModel>(API_URL.apiUrl.concat('/franchise/filter-pagination'), filterInput)
      .subscribe((response: any) => {
        console.log('Франшизы после фильтрации:', response.results);
        this.aFranchises = response.results;
        this.countFranchises = response.countAll;
        this.countTotalPage = response.countAll;
      }, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  }

  // getCatFranchPagination(): void {
  //   this.catFranchService.getPaginationCatFran(this.pageNumber, this.countRows)
  //     .pipe(take(1))
  //     .subscribe(res => {
  //       this.catFranchPagination = res
  //       console.log(this.catFranchPagination)
  //     })
  // }

  private loadPaginationInitAsync() {
    let paginationData = new PaginationInput();

    // TODO: доработать на динамическое получение из роута или как-нибудь еще, чтобы помнить, что выбирал пользователь.
    paginationData.PageNumber = 1;
    paginationData.CountRows = 12;

    this.http.post<InitCatalogFranchiseResponse>(API_URL.apiUrl.concat('/pagination/init-catalog-franchise'), paginationData)
      .subscribe((response: any) => {
        console.log('pagination init', response);
        this.countFranchises = response.countAll;
        this.aFranchises = response.results;
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
   * Функция фильтрует франшизы по параметрам с учётом пагинации.
   * @returns - Отфильтрованный список франшиз.
   */
  public onFilterFranchisesWithPaginationAsync() {
    let filterInput = new FilterFranchiseWithPaginationInput();
    filterInput.TypeSortPrice = this.selectedSort.value;
    filterInput.MinProfit = this.filterMinPrice;
    filterInput.MaxProfit = this.filterMaxPrice;
    filterInput.ViewCode = this.selectedViewBusiness.viewCode;
    filterInput.CategoryCode = this.selectedCategory.categoryCode;
    filterInput.MinInvest = this.minPrice;
    filterInput.MaxInvest = this.maxPrice;
    filterInput.IsGarant = this.isGarant;
    filterInput.PageNumber = 1;
    filterInput.CountRows = this.selectedCountRows;
    this.http.post<CatalogFranchiseModel>(API_URL.apiUrl.concat('/franchise/filter-pagination'), filterInput)
      .subscribe((response: any) => {
        console.log('Франшизы после фильтрации:', response.results);
        this.aFranchises = response.results;
        this.countFranchises = response.countAll;
        this.countTotalPage = response.totalCount;
      }, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  }

  public onClearFilters() {
    this.isGarant = false;
    this.minPrice = 0;
    this.filterMinPrice = 0;
    this.maxPrice = 0;
    this.filterMaxPrice = 0;
    this.selectedCategory = '';
    this.selectedSort = '';
    this.selectedViewBusiness = '';
    // this.getCatFranchPagination();
    this.loadPaginationInitAsync();
  }

  /**
   * Функция получит данные для блока событий.
   */
  private GetActionsAsync() {
    this.http.post<ActionsModel>(API_URL.apiUrl.concat('/main/actions'), {})
      .subscribe((response: any) => this.aDataActions = response.filter((el: any) => el.isTop == false), (err) => {
        throw new Error(err);
      });
  }

  /**
   * Функция получит список блогов.
   * @returns Список блогов.
   */
  // в сваггере не нашел 13/11/22 эндпоинт /blog/main-blogs
  private GetBlogsAsync() {
    this.http.post(API_URL.apiUrl.concat('/blog/main-blogs'), {})
      .subscribe((response: any) => this.aBlogs = response, (err) => {
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
    this.http.post<CatalogFranchiseModel>(API_URL.apiUrl.concat('/franchise/new-franchise'), {})
      .subscribe((response: any) => this.aNewFranchises = response, (err) => {
        throw new Error(err);
      });
  }

  private GetReviewsFranchisesAsync() {
    this.http.post<CatalogFranchiseModel>(API_URL.apiUrl.concat('/franchise/review'), {})
      .subscribe((response: any) => this.aReviewsFranchises = response, (err) => {
        throw new Error(err);
      });
  }

  /**
   * Функция запишет переход.
   */
  private setTransitionAsync(franchiseId: number) {
    this.commonService.setTransitionAsync(franchiseId, 'Franchise', '', '')
      .subscribe((data: any) => {
        console.log('Переход записан:', data)
        this.router.navigate(['/franchise/view'], {queryParams: {franchiseId: franchiseId}});
      });
  }

  /**
   * Функция перейдет к просмотру карточки франшизы.
   */
  public routeViewFranchiseCardAsync(franchiseId: number) {
    this.setTransitionAsync(franchiseId);
  }


  public cardsData:CardData[] = [
    {
      id: '1',
      name:'Название франшизы',
      description: 'Готовый бизнес',
      price: '12 500 000 ₽',
      img:'../../../../assets/images/common/main-carousel.jpg',


    },
    {
      id: '2',
      name: 'Название франшизы',
      description: 'Готовый бизнес',
      price: '12 500 000 ₽',
      img:'../../../../assets/images/common/main-carousel.jpg',
    },
    {
      id: '3',
      name: 'Название франшизы',
      description: 'Готовый бизнес',
      price: '12 500 000 ₽',
      img:'../../../../assets/images/common/main-carousel.jpg',
    },
    {
      id: '4',
      name: 'Название франшизы',
      description: 'Готовый бизнес',
      price: '12 500 000 ₽',
      img:'../../../../assets/images/common/main-carousel.jpg',


    },
    {
      id: '5',
      name: 'Название франшизы',
      description: 'Готовый бизнес',
      price: '12 500 000 ₽',
      img:'../../../../assets/images/common/main-carousel.jpg',
    },
    {
      id: '6',
      name: 'Название франшизы',
      description: 'Готовый бизнес',
      price: '12 500 000 ₽',
      img:'../../../../assets/images/common/main-carousel.jpg',
    },

  ];

  public test(event: any): void{
    console.log('!!!!', event)
  }
}
