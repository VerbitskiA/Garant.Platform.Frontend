import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {API_URL} from 'src/app/core/core-urls/api-url';
import {FilterInput} from 'src/app/models/franchise/input/filter-franchise-input';
import {FranchiseInput} from 'src/app/models/franchise/input/franchise-input';
import {PaginationInput} from 'src/app/models/pagination/input/pagination-input';
import {CommonDataService} from 'src/app/core/services/common/common-data.service';
import {LandingRequestService} from '../../../core/services/landing/landing.service';

export const headerCardsData = {
    title: 'Консультация',
    sublitle: 'по покупке бизнеса и франшиз',
    content_text: 'с сопровождением сделки и составлением договоров',
    content__button: 'Получить консультацию',
    content__button1: 'Консультация',
    image: '../../../../assets/images/consulting-landing/Group.png',
    alt: 'Изображение блокнота, ручки и портфеля',
  };

@Component({
  selector: 'app-consulting-landing',
  templateUrl: './consulting-landing.component.html',
  styleUrls: ['./consulting-landing.component.scss'],
})
export class ConsultingLandingComponent implements OnInit {
  public headerCardsData = headerCardsData;

  aPopularBusiness: any[] = [];
  // isGarant: boolean = false;
  // aCities: any[] = [];
  // aBusinessCategories: any[] = [];
  aViewBusiness: any[] = [];
  minPrice!: number;
  maxPrice!: number;
  view: string = '';
  city: string = '';
  category: string = '';
  selectedCity: string = '';
  // selectedCategory: string = "";
  selectedViewBusiness: string = '';
  // aBusinessList: any[] = [];
  selectedSort: any;
  // aSortPrices: any[] = [];
  // filterMinPrice!: number;
  // filterMaxPrice!: number;
  countTotalPage!: number;
  // countBusinesses!: number;
  aBlogs: any[] = [];
  aNews: any[] = [];
  categoryList1: any[] = [];
  categoryList2: any[] = [];
  categoryList3: any[] = [];
  categoryList4: any[] = [];
  // aDataActions: any[] = [];
  oTopAction: any = {};
  oSuggestion: any = {};
  aNewFranchises: any[] = [];
  responsiveOptions: any[] = [];
  aReviewsFranchises: any[] = [];
  businessId: number = 0;
  routeParam: number;
  isHideBusinessWithGarant: boolean = true;
  name: string = "";
  phoneNumber: string = "";

  public landingRequestNotify$ = new BehaviorSubject<any>(undefined);

  constructor(
    private http: HttpClient,
    private commonService: CommonDataService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private requestService: LandingRequestService) {
    // this.aSortPrices = [
    //     {
    //         name: "По убыванию цены",
    //         value: "Desc"
    //     },
    //     {
    //         name: "По возрастанию цены",
    //         value: "Asc"
    //     }
    // ];

    this.responsiveOptions = [
      {breakpoint: '1024px', numVisible: 3, numScroll: 3,},
      {breakpoint: '768px', numVisible: 2, numScroll: 2,},
      {breakpoint: '560px', numVisible: 1, numScroll: 1,},
    ];

    this.routeParam = this.route.snapshot.queryParams['businessId'];
  }

  public landingHeaderCard(event: any): void{
    console.log('landingHeaderCard', event);
  }

  public ngOnInit() {
    //  this.getPopularBusinessAsync();
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
  //  private  getPopularBusinessAsync() {
  //     try {
  //          this.commonService.getPopularBusinessAsync().then((data: any) => {
  //             console.log("Популярный бизнес:", data);
  //             this.aPopularBusiness = data;
  //         });
  //     }

  //     catch (e: any) {
  //         throw new Error(e);
  //     }
  // };

  /**
   * Функция отфильтрует список бизнеса по фильтрам.
   * @param viewCode - Код вида бизнеса.
   * @param categoryCode - Код категории бизнеса.
   * @param cityCode - Город бизнеса.
   * @param minPrice - Цена от.
   * @param maxPrice - Цена до.
   */
  public onFilterFranchisesAsync(form: NgForm) {
    let filterInput = new FranchiseInput();
    filterInput.viewCode = form.value.view.viewCode;
    filterInput.cityCode = form.value.city.cityCode;
    filterInput.categoryCode = form.value.category.categoryCode;
    filterInput.minPrice = form.value.minPrice;
    filterInput.maxPrice = form.value.maxPrice;

    this.http.post(API_URL.apiUrl.concat('/main/filter'), filterInput)
      .subscribe((response: any) => console.log('Отфильтрованный список франшиз:', response), (err) => {
        throw new Error(err);
      });
  }

  /**
   * Функция получит список бизнеса.
   */
  private GetBusinessListAsync() {
    this.http.post(API_URL.apiUrl.concat('/business/catalog-business'), {})
      .subscribe((response: any) => console.log('Список бизнеса:', response), (err) => {
        throw new Error(err);
      });
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список городов бизнеса.
   */
  private loadCitiesFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat('/business/cities-list'), {})
      .subscribe((response: any) => console.log('Список городов:', response), (err) => {
        throw new Error(err);
      });
  }

  /**
   * TODO: Вынести в общий сервис.
   * Функция получит список категорий бизнеса.
   */
  private loadCategoriesFranchisesListAsync() {
    this.http.post(API_URL.apiUrl.concat('/business/category-list'), {})
      .subscribe((response: any) => console.log('Список категорий бизнеса:', response), (err) => {
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
    let paginationData = new PaginationInput();
    paginationData.PageNumber = event.page + 1;
    paginationData.CountRows = event.rows;

    this.http.post(API_URL.apiUrl.concat('/pagination/catalog-business'), paginationData)
      .subscribe((response: any) => console.log('get data pagination', response), (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  }

  private loadPaginationInitAsync() {
    let paginationData = new PaginationInput();

    // TODO: доработать на динамическое получение из роута или как-нибудь еще, чтобы помнить, что выбирал пользователь.
    paginationData.PageNumber = 1;

    this.http.post(API_URL.apiUrl.concat('/pagination/init-catalog-business'), paginationData)
      .subscribe((response: any) => this.countTotalPage = response.totalCount, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  }

  public onChangeSortPrice() {
    console.log('onChangeSortPrice', this.selectedSort);
  }

  public FilterFranchisesAsync() {
    let filterInput = new FilterInput();
    filterInput.TypeSortPrice = this.selectedSort.value;
    this.http.post(API_URL.apiUrl.concat('/franchise/filter-franchises'), filterInput)
      .subscribe((response: any) => console.log('Франшизы после фильтрации:', response), (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  }

  public onClearFilters() {
    this.GetBusinessListAsync();
  }

  /**
   * Функция получит данные для блока событий.
   */
  private GetActionsAsync() {
    this.http.post(API_URL.apiUrl.concat('/main/actions'), {})
      .subscribe((response: any) => console.log('Блок событий:', response),
        (err) => {
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
   * Функция перейдет к просмотру карточки бизнеса.
   */
  public routeViewFranchiseCardAsync(businessId: number) {
    this.commonService.setTransitionAsync(businessId, 'Business', '', '')
      .subscribe((data: any) => this.router.navigate(['/business/view'], {queryParams: {businessId: businessId}}));
  };

  public onSendLandingRequestAsync(name: string, phoneNumber: string) {
    this.requestService.sendLandingRequestAsync(name, phoneNumber, "Консалтинг").subscribe(() => {
      this.name = '';
      this.phoneNumber = ''
    });
  };
}
