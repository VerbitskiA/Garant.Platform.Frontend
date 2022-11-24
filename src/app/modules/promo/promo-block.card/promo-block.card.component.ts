import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CatalogPromoCardComponent} from "../../products/catalog/catalog.promo.card/catalog.promo.card.component";
import {PromoService} from "../../../core/services/promo/promo.service";
import {shareReplay} from "rxjs/operators";

/**
 * Блок со слайдером
 *
 * TODO: Необходимо реализовать через провайдер данных с общей моделью, сейчас берём общие данные для всех страниц
 * */
@Component({
  selector: 'app-promo-block-card',
  templateUrl: './promo-block.card.component.html',
  styleUrls: ['./promo-block.card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  cardComponent = CatalogPromoCardComponent;

  readonly aSliderItems$ = this._service.getRecentlyPurchasedProducts().pipe(
    shareReplay(1),
  )

  readonly actionsTop$ = this._service.actionsTop$;

  constructor(
    private _service: PromoService
  ) {
  }

  public cardsData = [
    {
      id: '1',
      name: 'Bugatti',
      description: 'Racing car',
      price: 800,
    },
    {
      id: '2',
      name: 'Ferrari',
      description: 'The Prancing Horse',
      price: 1500,
    },
    {
      id: '3',
      name: 'Porsche',
      description: 'Full spectrum',
      price: 10000,
    },

  ];

}
