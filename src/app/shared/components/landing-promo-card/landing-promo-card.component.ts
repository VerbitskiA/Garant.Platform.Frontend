import {Component, Input, ViewEncapsulation} from '@angular/core';

export namespace LandingPromo {
  export interface IPromoItem {
    title: string;
    subtitle: string;
    button_accept: string;
    button_later: string;

    image: string;
    alt: string;
  }
}

@Component({
  selector: 'app-landing-promo-card',
  templateUrl: './landing-promo-card.component.html',
  styleUrls: ['./landing-promo-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPromoCardComponent {
  @Input() public cardData: LandingPromo.IPromoItem | undefined;
}
