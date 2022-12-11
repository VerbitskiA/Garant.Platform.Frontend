import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CatalogPromoCardComponent} from "../../products/catalog/catalog.promo.card/catalog.promo.card.component";
import {PromoService} from "../../../core/services/promo/promo.service";
import {shareReplay} from "rxjs/operators";
interface CardData {
  id?: string;
  name?: string;
  description?: string;
  time?: string;
  price?: string;
}
/**
 * Блок со слайдером
 *
 * TODO: Необходимо реализовать через провайдер данных с общей моделью, сейчас берём общие данные для всех страниц
 * */
@Component({
  selector: 'app-promo-block-card',
  templateUrl: './promo-block.card.component.html',
  styleUrls: ['./promo-block.card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PromoBlockCardComponent {

  /**
   * Заголовок над слайдером
   *
   * @default 'Недавно приобрели'
   * */
  @Input('sliderTitle')
  sliderTitle = 'Недавно приобрели';

  /**
   * Заголовок над баннером
   *
   * @default 'Покупка бизнеса с гарантиями'
   * */
  @Input('bannerTitle')
  bannerTitle = 'Покупка бизнеса с гарантиями';
  responsiveOptions;
  cardComponent = CatalogPromoCardComponent;

  readonly aSliderItems$ = this._service.getRecentlyPurchasedProducts().pipe(
    shareReplay(1),
  )

  readonly actionsTop$ = this._service.actionsTop$;

  getAction(card:CardData){}

  constructor(private _service: PromoService) {
    this.responsiveOptions = [
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


  public cardsData = [
    {
      id: '1',
      name: 'Название готового бизнеса',
      description: 'Готовый бизнес',
      price: '12 500 000 ₽ ',
      time:'24 дня',
      img:'../../../../assets/images/common/main-carousel.jpg',


    },
    {
      id: '2',
      name: 'Название готового бизнеса',
      description: 'Готовый бизнес',
      time:'24 дня',
      price: '12 500 000 ₽ ',
      img:'../../../../assets/images/common/main-carousel.jpg',
    },
    {
      id: '3',
      name: 'Название готового бизнеса',
      description: 'Готовый бизнес',
      time:'24 дня',
      price: '12 500 000 ₽ ',
      img:'../../../../assets/images/common/main-carousel.jpg',
    },

  ];

}
