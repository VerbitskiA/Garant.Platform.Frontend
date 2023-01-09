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
import {CommonModels} from "../../../models/common-models";
import BackgroundColorVariant = CommonModels.BackgroundColorVariant;
import {LandingStatistic} from "../../../shared/components/landing-statistics-card/landing-statistics-card.component";
import {LandingFourStepsData} from "../../../shared/components/landing-four-steps-card/landing-four-steps-card.component";
import {LandingPromo} from "../../../shared/components/landing-promo-card/landing-promo-card.component";
import {LandingPacksData} from "../../../shared/components/landing-packs-card/landing-packs-card.component";

export const headerCardsData = {
  title: 'Консультация',
  subtitle: 'по покупке бизнеса и франшиз',
  content_text: 'с сопровождением сделки и составлением договоров',
  content__button: 'Получить консультацию',
  content__button2: 'Консультация',
  image: '../../../../assets/images/consulting-landing/Group.png',
  alt: 'Изображение блокнота, ручки и портфеля',
  image2: '../../../../assets/images/consulting-landing/Group1.png',
  alt2: 'Изображение монетки, процента и доски'
};

export const allCardStatisticData: LandingStatistic.IStatisticItem[] = [
  {
    item_number: '7',
    item_text: `договоров для сделки необходимо подготовить с учетом актов`
  },
  {
    item_number: '735',
    item_text: `договоров подготовили наши юриcты`
  },
  {
    item_number: '105',
    item_text: `сделок помогли провести наши юристы`
  },
  {
    item_number: '15',
    item_text: `раз в среднем за одну сделку обращаются к юристам`
  }
]

export const landingFourStepsDataHeader = "4 шага к безопасной сделке онлайн"
export const allCardsFourStepsData: LandingFourStepsData.IConsultationItem[] = [
  {
    title: 'Проверка бизнеса',
    subtitle: 'или франшиз',
    stage: 'Шаг 1',
    item_text: 'До приобретения бизнеса и начала сделки следует заказать полную проверку.',
    item__button: 'Проверить бизнес',
    image: '../../../../assets/images/consulting-landing/loupe-clip-art-6%201.png',
    alt: 'Лупа'
  },
  {
    title: 'Консультация',
    subtitle: 'на каждом этапе сделки',
    stage: 'Шаг 2',
    item_text: 'После оплаты каждого этапа вы становитесь полноправным владельцем бизнеса',
    item__button: 'Получить консультацию',
    image: '../../../../assets/images/consulting-landing/credit_card_PNG24%201.png',
    alt: 'Кредитная карточка'
  },
  {
    title: 'Составление договора',
    subtitle: 'в процессе сделки',
    stage: 'Шаг 3',
    item_text: 'Вы можете заказать составление договора для сделки у юриста и всех актов.',
    item__button: 'Заказать договор',
    image: '../../../../assets/images/consulting-landing/pen-clip-art-6%202.png',
    alt: 'Ручка'
  },
  {
    title: 'Согласование договор',
    subtitle: 'и корректировки',
    stage: 'Шаг 4',
    item_text: 'В процессе сделки вы будете получать договор от продавца. Юрист проверит его.',
    item__button: 'Получить сопровождение',
    image: '../../../../assets/images/consulting-landing/file-clip-art-6%203.png',
    alt: 'Папка'
  }
]

export const consultationCardsData = {
  title: 'Проверка',
  subtitle: 'юридических документов',
  content_text: 'при покупке франшизы или готового бизнеса',
  content__label1: 'Имя',
  content__placeholder1: 'Введите имя',
  content__label2: 'Номер телефона',
  content__placeholder2: 'Введите номер телефона',
  content__button: 'Обратиться за консультацией',
  content__button2: 'Отправить договор на проверку',
  image: '../../../../assets/images/consulting-landing/template_person6%201.png',
  alt: 'Фото проверяющего'
};

export const promoCardData: LandingPromo.IPromoItem = {
  title: "Вы можете приобрести бизнес с гарантиями",
  subtitle: "Воспользовавшись нашим сервисом вы сможете провести безопасную сделку через интернет, провести все средства онлайн и стать полноправным владельцем бизнеса уже сегодня.",
  button_accept: "Подробнее",
  button_later: "Не интересно",
  image: '../../../assets/images/franchise-landing/no2.png',
  alt: 'крестик'
}

export const landingPacksDataHeader = 'Пакеты юридических услуг'
export const allCardsPacksData: LandingPacksData.IConsultationItem[] = [
  {
    title: 'Пакет “Подготовка договора”',
    item_text: "Подготовка договора ",
    item__yes_image: "../../../../assets/images/franchise-landing/YES.png",
    item__no_image: "../../../../assets/images/franchise-landing/NO.png",
    item__list: [
      {
        item_class: "packs-item__yes",
        item__tool: "Подготовка ключевого договора"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Подготовка актов приема передачи"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Разработка сайта для продажи франшизы (до 10 страниц)"
      }
    ],
    item_bottom__title: "Срок",
    item_bottom__title_value: "5 дней",

    item_bottom__price: "Стоимость пакета",
    item_bottom__price_value: "15 000 ₽",
    item_bottom__button: "Подготовить договор"
  },

  {
    title: 'Пакет “Проверка контрагента”',
    item_text: "Наш самый популярный пакет с гарантией. В рамках которого вы получаете полностью упакованный бизнес во франшизу",
    item__yes_image: "../../../../assets/images/franchise-landing/YES.png",
    item__no_image: "../../../../assets/images/franchise-landing/NO.png",
    item__list: [
      {
        item_class: "packs-item__yes",
        item__tool: "Аудит бизнеса"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка сайта для продажи франшизы (до 10 страниц)"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка пакетов франшизы и определение их стоимости"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Книга продаж Вашей франшизы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка стратегии: «Каналы продаж франшизы»"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Настройка рекламной кампании, для запуска продаж Вашей франшизы либо размещение в ТОП-овом каталоге франшиз;"
      },

      {
        item_class: "packs-item__no",
        item__tool: "Внедрение системы записи звонков"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Контроль качества звонков менеджера, нашим руководителем отдела продаж"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Совместная обработка звонков и возникающих вопросов у клиента"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Настройка CRM-системы"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Гарантированное сопровождение и доведение до первых продаж франшизы"
      },

    ],
    item_bottom__title: "Срок",
    item_bottom__title_value: "7 раб. дней",

    item_bottom__price: "Стоимость пакета",
    item_bottom__price_value: "35 000 ₽",
    item_bottom__button: "Проверить контрагента"
  },

  {
    title: 'Пакет “Сопровождение сделки”',
    item_text: "Наш самый популярный пакет с гарантией. В рамках которого вы получаете полностью упакованный бизнес во франшизу",
    item__yes_image: "../../../../assets/images/franchise-landing/YES.png",
    item__no_image: "../../../../assets/images/franchise-landing/NO.png",
    item__list: [
      {
        item_class: "packs-item__yes",
        item__tool: "Аудит бизнеса"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка сайта для продажи франшизы (до 10 страниц)"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка пакетов франшизы и определение их стоимости"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Книга продаж Вашей франшизы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка стратегии: «Каналы продаж франшизы»"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Настройка рекламной кампании, для запуска продаж Вашей франшизы либо размещение в ТОП-овом каталоге франшиз;"
      },

      {
        item_class: "packs-item__yes",
        item__tool: "Внедрение системы записи звонков"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Контроль качества звонков менеджера, нашим руководителем отдела продаж"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Совместная обработка звонков и возникающих вопросов у клиента"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Настройка CRM-системы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Гарантированное сопровождение и доведение до первых продаж франшизы"
      },

    ],
    item_bottom__title: "Срок",
    item_bottom__title_value: "14 раб. дней",

    item_bottom__price: "Стоимость пакета",
    item_bottom__price_value: "55 000 ₽",
    item_bottom__button: "Заказать сопровождение"
  }
]


@Component({
  selector: 'app-consulting-landing',
  templateUrl: './consulting-landing.component.html',
  styleUrls: ['./consulting-landing.component.scss'],
})
export class ConsultingLandingComponent implements OnInit {
  public headerCardsData = headerCardsData;
  public allCardStatisticData = allCardStatisticData;

  public landingFourStepsDataHeader = landingFourStepsDataHeader;
  public allCardsFourStepsData = allCardsFourStepsData;

  public consultationCardsData = consultationCardsData;

  public promoCardData = promoCardData;
  public backgroundColorVariant = BackgroundColorVariant;

  public landingPacksDataHeader = landingPacksDataHeader;
  public allCardsPacksData = allCardsPacksData;


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

  public landingHeaderCard(event: any): void {
    console.log('landingHeaderCard', event);
  }

  public landingConsultationCard(event: any): void {
    console.log('landingConsultationCard', event);
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
