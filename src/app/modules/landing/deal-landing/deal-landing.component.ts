import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {API_URL} from 'src/app/core/core-urls/api-url';
import {FilterInput} from 'src/app/models/franchise/input/filter-franchise-input';
import {FranchiseInput} from 'src/app/models/franchise/input/franchise-input';
import {PaginationInput} from 'src/app/models/pagination/input/pagination-input';
import {CommonDataService} from 'src/app/core/services/common/common-data.service';
import {LandingRequestService} from '../../../core/services/landing/landing.service';
import {takeUntil} from "rxjs/operators";
import {GarDestroyService} from "../../../gar-lib/gar-destroy.service";
import {CommonModels} from "../../../models/common-models";
import BackgroundColorVariant = CommonModels.BackgroundColorVariant;
import {LandingStatistic} from "../../../shared/components/landing-statistics-card/landing-statistics-card.component";
import {LandingHeader} from "../../../shared/components/landing-header-card/landing-header-card.component";
import {
  LandingFourStepsData
} from "../../../shared/components/landing-four-steps-card/landing-four-steps-card.component";
import {SelectedItem} from "../../../shared/components/landing-selection-card/landing-selection-card.component";

export const headerCardsData: LandingHeader.IHeaderItem  = {
  title: 'Онлайн сделка',
  subtitle: 'по покупке бизнеса',
  content_text: 'или франшизы',
  content__button: 'Как начать сделку?',
  content__button2: 'Как начать сделку?',
  image: '../../../../assets/images/deal-landing/shield.png',
  alt: 'Изображение щита',
  image2: '../../../../assets/images/deal-landing/shield_mobile.png',
  alt2: 'Изображение щита'
};

export const allCardStatisticData: LandingStatistic.IStatisticItem[] = [
  {
    item_number: '10',
    item_text: `сделок в среднем проходит через сервис гарант`
  },
  {
    item_number: '35',
    item_text: `франшиз были проданы через сервис гарант`
  },
  {
    item_number: '105',
    item_text: `бизнесов уже были  проданы через   сервис гарант`
  },
  {
    item_number: '0,5-3%',
    item_text: ` комиссия за использование  сервиса покупки онлайн`
  }
]

export const consultationCardsData = {
  title: 'Консультация',
  subtitle: 'при покупке бизнеса онлайн',
  content_text: 'с юристом и консультантами сервиса',
  content__label1: 'Имя',
  content__placeholder1: 'Введите имя',
  content__label2: 'Номер телефона',
  content__placeholder2: 'Введите номер телефона',
  content__button: 'Обратиться за консультацией',
  content__button2: 'Обратиться за консультацией',
  image: '../../../../assets/images/deal-landing/template_person6%201.png',
  alt: 'Фото консультанта'
};

export const landingFourStepsDataHeader = "4 шага к безопасной сделке онлайн"
export const allCardsFourStepsData: LandingFourStepsData.IConsultationItem[] = [
  {
    title: 'Выбрать бизнес',
    subtitle: 'или франшизу',
    stage: 'Шаг 1',
    item_text: 'Воспользуйтесь каталогом для удобного и быстрого поиска по вашим параметрам',
    item__button: 'Начать поиск',
    image: '../../../../assets/images/consulting-landing/loupe-clip-art-6%201.png',
    alt: 'Лупа'
  },
  {
    title: 'Пройти регистрацию',
    subtitle: 'на нашем портале',
    stage: 'Шаг 2',
    item_text: 'Вы можете пройти быструю регистрацию до начала выбора бизнеса или во время',
    item__button: 'Пройти регистрацию',
    image: '../../../../assets/images/consulting-landing/credit_card_PNG24%201.png',
    alt: 'Кредитная карточка'
  },
  {
    title: 'Начать сделку',
    subtitle: 'и распланировать этапы сделки',
    stage: 'Шаг 3',
    item_text: 'Вы сможете распланировать онлайн сделку посредством сервиса гарант',
    item__button: 'Начать сделку',
    image: '../../../../assets/images/consulting-landing/pen-clip-art-6%202.png',
    alt: 'Ручка'
  },
  {
    title: 'Провести оплату',
    subtitle: 'по каждому этапу',
    stage: 'Шаг 4',
    item_text: 'После оплаты каждого этапа вы становитесь полноправным владельцем бизнеса',
    item__button: 'Получить консультацию',
    image: '../../../../assets/images/consulting-landing/file-clip-art-6%203.png',
    alt: 'Папка'
  }
]

export const allSelectedCardData: SelectedItem[] = [
  {
    title: 'Подберите подходящий бизнес',
    subtitle: 'Получите подборку подходящих бизнесов',
    item_text: 'Пройдите краткий опрос, на основе вашего опыта, навыков и знаний мы предложим вам подходящий бизнес в форме готового бизнеса или франшиз.',
    button: 'Получить подборку',
    image: '../../../../assets/images/selected-card/target.png',
    image_small:'../../../../assets/images/selected-card/target-small.png',
    alt: 'Мишень'
  },
  {
    title: 'Продайте свой бизнес',
    subtitle: 'Вы можете продать свой бизнес',
    item_text: 'Все что вам нужно - выложить объявление в нашем каталоге, после проверки модераторами мы выложим его в общий доступ.',
    button: 'Продать бизнес',
    image: '../../../../assets/images/selected-card/bag.png',
    image_small:'../../../../assets/images/selected-card/bag-small.png',
    alt: 'Мешок с деньгами'
  },
  {
    title: 'Создайте свою франшизу',
    subtitle: 'Закажите упаковку франшизы у нас',
    item_text: 'Если ваш готовый бизнес уже имеет открытые филиалы или вы собираетесь заводить таковые, то вы с уверенностью можете оставлять заявку.',
    button: 'Упаковать франшизу',
    image: '../../../../assets/images/selected-card/notes.png',
    image_small:'../../../../assets/images/selected-card/notes-small.png',
    alt: 'Блокнот со списком дел'
  },
]


@Component({
  selector: 'app-deal-landing',
  templateUrl: './deal-landing.component.html',
  styleUrls: ['./deal-landing.component.scss'],
  providers: [GarDestroyService],

})
export class DealLandingComponent implements OnInit {
  public headerCardsData = headerCardsData;
  public allCardStatisticData = allCardStatisticData;
  public allCardsFourStepsData = allCardsFourStepsData;
  public allSelectedCardData = allSelectedCardData;
  public landingFourStepsDataHeader = landingFourStepsDataHeader;
  public consultationCardsData = consultationCardsData;
  public backgroundColorVariant = BackgroundColorVariant;

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
  aDataActions: any[] = [];
  oTopAction: any = {};
  oSuggestion: any = {};
  aNewFranchises: any[] = [];
  responsiveOptions: any[] = [];
  aReviewsFranchises: any[] = [];
  businessId: number = 0;
  routeParam: number;
  aPopularFranchises: any[] = [];
  isHideBusinessWithGarant: boolean = true;
  name: string = "";
  phoneNumber: string = "";


  constructor(
    private http: HttpClient,
    private commonService: CommonDataService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private requestService: LandingRequestService,
    private _destroy$: GarDestroyService
  ) {
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

  public landingHeaderCard(event: any): void {
    console.log('landingHeaderCard', event);
  }

  public landingConsultationCard(event: any): void {
    console.log('landingConsultationCard', event);
    this.onSendLandingRequestAsync2(event.name, event.phoneNumber);
  }

  public onSendLandingRequestAsync2(name: string, phoneNumber: string) {
    this.requestService.sendLandingRequestAsync(name, phoneNumber, "Консалтинг").subscribe(() => {
      this.name = '';
      this.phoneNumber = ''
    });
  };

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
    this.getPopularAsync();
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
    // filterInput.ProfitMinPrice = this.filterMinPrice.toString();
    // filterInput.ProfitMaxPrice = this.filterMaxPrice.toString();

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
      .subscribe((response: any) => this.aDataActions = response.filter((el: any) => el.isTop == false), (err) => {
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
      .subscribe((data: any) => {
        console.log('Переход записан:', data)
        this.router.navigate(['/business/view'], {
          queryParams: {businessId: businessId},
        });
      });
  }

  /**
   * Функция получит список популярныз франшиз.
   * @returns Список франшиз.
   */
  private getPopularAsync() {
    this.commonService.getPopularFranchise().pipe(takeUntil(this._destroy$)).subscribe(data => this.aPopularFranchises = data);
  }

  public onSendLandingRequestAsync(name: string, phoneNumber: string) {
    this.requestService.sendLandingRequestAsync(name, phoneNumber, "Покупка через гарант").subscribe(() => {
      this.name = '';
      this.phoneNumber = ''
    });
  }
}
