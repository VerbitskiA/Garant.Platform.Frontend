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
import {CatalogShortCardComponent} from '../../products/catalog/catalog.short.card/catalog.short.card.component';
import {shareReplay, takeUntil, tap} from 'rxjs/operators'; //!!!!!!
import {GarDestroyService} from "../../../gar-lib/gar-destroy.service";
import {
  LandingConsultation
} from "../../../shared/components/landing-consultation-card/landing-consultation-card.component";
import {CommonModels} from "../../../models/common-models";
import BackgroundColorVariant = CommonModels.BackgroundColorVariant;
import {LandingHeader} from "../../../shared/components/landing-header-card/landing-header-card.component";
import {LandingStatistic} from "../../../shared/components/landing-statistics-card/landing-statistics-card.component";
import {LandingPromo} from "../../../shared/components/landing-promo-card/landing-promo-card.component";
import {
  LandingFourStepsData
} from "../../../shared/components/landing-four-steps-card/landing-four-steps-card.component";
import {LandingPacksData} from "../../../shared/components/landing-packs-card/landing-packs-card.component";
import {SelectedItem} from "../../../shared/components/landing-selection-card/landing-selection-card.component"; //!!!!


export const headerCardsData: LandingHeader.IHeaderItem = {
  title: 'Создание',
  subtitle: 'и упаковка франшиз',
  content_text: 'с бесплатным размещением в каталоге',
  content__button: 'Бесплатная консультация',
  content__button2: 'Консультация',
  image: '../../../../assets/images/franchise-landing/desk.png',
  alt: 'Изображение стола, монеты и %',
  image2: '../../../../assets/images/franchise-landing/desk2.png',
  alt2: 'Изображение стола, монеты и %',
};

export const allSelectedCardData: SelectedItem[] = [
  {
    title: 'Продать франшизу',
    subtitle: 'Начните размещаться в каталоге',
    item_text: 'Размещение в каталоге франшиз приносит большую часть заявок нашим клиентам за счет SEO продвижения и рекламы сервиса.',
    button: 'Разместить франшизу',
    image: '../../../../assets/images/selected-card/target.png',
    image_small:'../../../../assets/images/selected-card/target-small.png',
    alt: 'Мишень'
  },
  {
    title: 'Продайте франшизу онлайн',
    subtitle: 'Вы можете продать свой бизнес',
    item_text: 'Каждая сделка проводится по защищенному соединеню с возможностью разбить на этапы, провести документооборот и перевести деньги.',
    button: 'Продать франшизу',
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

export const allCardStatisticData: LandingStatistic.IStatisticItem[] = [
  {
    item_number: '80',
    item_text: `франшиз упаковали и создали с нуля`
  },
  {
    item_number: '25',
    item_text: `сфер бизнеса проработано за время работы`
  },
  {
    item_number: '60 млн',
    item_text: `заработали клиентам после создания франшиз`
  },
  {
    item_number: '14',
    item_text: `человек будут работать над вашим проектом`
  }
]

export const landingFourStepsDataHeader = "Бонусы от GoBizy"
export const allCardsFourStepsData: LandingFourStepsData.IConsultationItem[] = [
  {
    title: 'Бесплатное размещение в каталоге',
    subtitle: 'на срок от 3 до 12 месяцев. Срок размещения зависит от выбранного пакетаили франшиз',
    stage: 'Шаг 1',
    item_text: 'После покупки любого из пакетов вы получите бесплатное размещине в сервисе',
    item__button: 'Упаковать франшизу',
    image: '../../../../assets/images/consulting-landing/loupe-clip-art-6%201.png',
    alt: 'Лупа'
  },
  {
    title: 'Книга продаж и обучение вашего менеджера',
    subtitle: 'в любом выбранном пакете, вне зависмости от стоимости',
    stage: 'Шаг 2',
    item_text: 'Помощь с обучением вашего менеджера, составление книги продаж',
    item__button: 'Обучить менеджера',
    image: '../../../../assets/images/consulting-landing/credit_card_PNG24%201.png',
    alt: 'Кредитная карточка'
  },
  {
    title: 'Проверка товарного знака',
    subtitle: 'полная и оперативная проверка товарного знака',
    stage: 'Шаг 3',
    item_text: 'Бесплатная и быстрая проверка товарного знака франшизы',
    item__button: 'Проверить товарный знак',
    image: '../../../../assets/images/consulting-landing/pen-clip-art-6%202.png',
    alt: 'Ручка'
  },
  {
    title: 'Функция управляющей компании',
    subtitle: 'Отдельный пакет по упаковке с полным делигированием',
    stage: 'Шаг 4',
    item_text: 'Все функции по продаже и открытию франшиз мы возьмем на себя',
    item__button: 'Нанять УК',
    image: '../../../../assets/images/consulting-landing/file-clip-art-6%203.png',
    alt: 'Папка'
  }
]

export const consultationCardsData: LandingConsultation.IConsultationItem = {
  title: 'Азамат Булатов',
  subtitle: 'сооснователь проекта',
  content_text: 'Лично ответственный за каждую упакованную франшизу',
  content__label1: 'Имя',
  content__placeholder1: 'Введите имя',
  content__label2: 'Номер телефона',
  content__placeholder2: 'Введите номер телефона',
  content__button: 'Обратиться за консультацией',
  content__button2: 'Обратиться за консультацией',
  image: '../../../../assets/images/franchise-landing/azamat2.png',
  alt: 'Фото сооснователя'
};

export const consultationCardsData2: LandingConsultation.IConsultationItem = {
  title: 'Управляющая компания',
  subtitle: 'Особый пакет',
  content_text: "Условия обсуждаются индвидуально.",
  content_text2: "От 1 500 000 ₽",
  content__label1: 'Имя',
  content__placeholder1: 'Введите имя',
  content__label2: 'Номер телефона',
  content__placeholder2: 'Введите номер телефона',
  content__button: 'Обратиться за консультацией',
  content__button2: 'Обратиться за консультацией',
  image: '../../../../assets/images/franchise-landing/Layer_7_1%201.png',
  alt: 'Фото управляющего'
};

export const promoCardData: LandingPromo.IPromoItem = {
  title: "Вы можете приобрести бизнес с гарантиями",
  subtitle: "Воспользовавшись нашим сервисом вы сможете провести безопасную сделку через интернет, провести все средства онлайн и стать полноправным владельцем бизнеса уже сегодня.",
  button_accept: "Подробнее",
  button_later: "Не интересно",
  image: '../../../assets/images/franchise-landing/no2.png',
  alt: 'крестик'
}
export const landingPacksDataHeader = 'Пакеты на создание франшиз упаковки'
export const allCardsPacksData: LandingPacksData.IConsultationItem[] = [
  {
    image_pack: "../../../../assets/images/franchise-landing/fast-start%201.png",
    alt: "Пакет из 7 инструментов",
    title: 'Пакет “Быстрый старт”',
    item_text: "Если у Вас за порогом стоит потенциальный покупатель или Вы хотите просто протестировать нишу, то этот пакет именно для Вас!",
    item__yes_image: "../../../../assets/images/franchise-landing/YES.png",
    item__no_image: "../../../../assets/images/franchise-landing/NO.png",
    item__list: [
      {
        item_class: "packs-item__yes",
        item__tool: "Аудит бизнеса и анализ конкурентов"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка состава франшизы: определение стоимости франшизы, создание уникального предложения и концепции франшизы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка пакетов франшизы и определение их стоимости"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Создание финансовой модели франшизы (инвестиции в запуск доходность и окупаемость)"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка договора коммерческой концессии/лицензионный договор"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Презентация франшизы (маркетинг кит)"
      },

      {
        item_class: "packs-item__no",
        item__tool: "Разработка сайта для продажи франшизы (до 10 страниц)"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Книга продаж Вашей франшизы"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Обучение и аттестация Вашего менеджера по продажам"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Внедрение CRM системы для аналитики продаж франшизы"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Разработка фирменного стиля компании"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Руководство по запуску франшизы (франчбук)"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Разработка стратегии: «Каналы продаж франшизы»"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Настройка рекламной кампании, для запуска продаж Вашей франшизы либо размещение в ТОП-овом каталоге франшиз"
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
    item_bottom__title_value: "20 дней",
    item_bottom__text: "Бесплатный бонус",
    item_bottom__text1: "обучение вашего менеджера",
    item_bottom__price: "Стоимость пакета",
    item_bottom__price_value: "350 000 ₽",
    item_bottom__button: "Упаковать франшизу"
  },

  {
    image_pack: "../../../../assets/images/franchise-landing/fast-start%202.png",
    alt: "Пакет из 15 инструментов",
    title: 'Пакет “Франшиза под ключ”',
    item_text: "Этот пакет для Вас, если Вам нужен полный комплекс услуг необходимых для продажи франшизы и запуска Вашего франчайзи.",
    item__yes_image: "../../../../assets/images/franchise-landing/YES.png",
    item__no_image: "../../../../assets/images/franchise-landing/NO.png",
    item__list: [
      {
        item_class: "packs-item__yes",
        item__tool: "Аудит бизнеса и анализ конкурентов"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка состава франшизы: определение стоимости франшизы, создание уникального предложения и концепции франшизы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка пакетов франшизы и определение их стоимости"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Создание финансовой модели франшизы (инвестиции в запуск доходность и окупаемость)"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка договора коммерческой концессии/лицензионный договор"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Презентация франшизы (маркетинг кит)"
      },

      {
        item_class: "packs-item__yes",
        item__tool: "Разработка сайта для продажи франшизы (до 10 страниц)"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Книга продаж Вашей франшизы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Обучение и аттестация Вашего менеджера по продажам"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Внедрение CRM системы для аналитики продаж франшизы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка фирменного стиля компании"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Руководство по запуску франшизы (франчбук)"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Разработка стратегии: «Каналы продаж франшизы»"
      },
      {
        item_class: "packs-item__no",
        item__tool: "Настройка рекламной кампании, для запуска продаж Вашей франшизы либо размещение в ТОП-овом каталоге франшиз"
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
    item_bottom__title_value: "25 дней",
    item_bottom__text: "Бесплатный бонус",
    item_bottom__text1: "обучение вашего менеджера",
    item_bottom__price: "Стоимость пакета",
    item_bottom__price_value: "480 000 ₽",
    item_bottom__button: "Упаковать франшизу"
  },

  {
    image_pack: "../../../../assets/images/franchise-landing/fast-start%203.png",
    alt: "Пакет из 25 инструментов",
    title: 'Пакет “Доведение до продаж”',
    item_text: "В рамках пакета быстрый старт вы получаете полностью упакованный бизнес во франшизу + обученного менеджера.",
    item__yes_image: "../../../../assets/images/franchise-landing/YES.png",
    item__no_image: "../../../../assets/images/franchise-landing/NO.png",
    item__list: [
      {
        item_class: "packs-item__yes",
        item__tool: "Аудит бизнеса и анализ конкурентов"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка состава франшизы: определение стоимости франшизы, создание уникального предложения и концепции франшизы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка пакетов франшизы и определение их стоимости"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Создание финансовой модели франшизы (инвестиции в запуск доходность и окупаемость)"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка договора коммерческой концессии/лицензионный договор"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Презентация франшизы (маркетинг кит)"
      },

      {
        item_class: "packs-item__yes",
        item__tool: "Разработка сайта для продажи франшизы (до 10 страниц)"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Книга продаж Вашей франшизы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Обучение и аттестация Вашего менеджера по продажам"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Внедрение CRM системы для аналитики продаж франшизы"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка фирменного стиля компании"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Руководство по запуску франшизы (франчбук)"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Разработка стратегии: «Каналы продаж франшизы»"
      },
      {
        item_class: "packs-item__yes",
        item__tool: "Настройка рекламной кампании, для запуска продаж Вашей франшизы либо размещение в ТОП-овом каталоге франшиз"
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
    item_bottom__title_value: "35 дней",
    item_bottom__text: "Бесплатный бонус",
    item_bottom__text1: "обучение вашего менеджера",
    item_bottom__price: "Стоимость пакета",
    item_bottom__price_value: "750 000 ₽",
    item_bottom__button: "Упаковать франшизу"
  }
]


@Component({
  selector: 'app-franchise-landing',
  templateUrl: './franchise-landing.component.html',
  styleUrls: ['./franchise-landing.component.scss'],
  providers: [GarDestroyService] //!!!!
})
export class FranchiseLandingComponent implements OnInit {
  public headerCardsData = headerCardsData;
  public allCardStatisticData = allCardStatisticData;
  public landingFourStepsDataHeader = landingFourStepsDataHeader;
  public allCardsFourStepsData = allCardsFourStepsData;
  public consultationCardsData = consultationCardsData;
  public consultationCardsData2 = consultationCardsData2;
  public allSelectedCardData = allSelectedCardData;
  public promoCardData = promoCardData;

  public allCardsPacksData = allCardsPacksData;
  public landingPacksDataHeader = landingPacksDataHeader;

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
  //aPopularFranchises$: any[] = [];
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
  isHideBusinessWithGarant: boolean = true;
  name: string = '';
  phoneNumber: string = '';

  /** Компонент, передаваемый в карусель!!!!! */
  cardComponent = CatalogShortCardComponent;
  /** список популярных франшиз **/
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
    private requestService: LandingRequestService,
    private _destroy$: GarDestroyService,//!!!!!!!!


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
        console.log('Переход записан:', data);
        this.router.navigate(['/business/view'], {
          queryParams: {businessId: businessId},
        });
      });
  }

  public onSendLandingRequestAsync(name: string, phoneNumber: string) {
    this.requestService.sendLandingRequestAsync(name, phoneNumber, "Упаковка франшиз").subscribe(() => {
      this.name = '';
      this.phoneNumber = ''
    });
  }
}
