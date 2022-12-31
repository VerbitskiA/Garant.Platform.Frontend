import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {isEmpty} from "lodash";

export namespace LandingPacksData {
  export interface IConsultationItem {
    image_pack?: string;
    alt?: string;
    title: string;
    item_text: string;

    item__yes_image: string;
    item__no_image: string;
    item__list: {
      item_class: string;
      item__tool?: string;
    }[];

    item_bottom__title: string;
    item_bottom__title_value: string;

    item_bottom__text?: string;
    item_bottom__text1?: string;
    item_bottom__price: string;
    item_bottom__price_value: string;
    item_bottom__button: string;
  }
}

@Component({
  selector: 'app-landing-packs-card',
  templateUrl: './landing-packs-card.component.html',
  styleUrls: ['./landing-packs-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPacksCardComponent implements OnInit {

  @Input() public landingPacksDataHeader: string | undefined
  @Input() public allCardsPacksData: LandingPacksData.IConsultationItem[] | undefined;

  public get dataIsSets(): boolean {
    return !isEmpty(this.allCardsPacksData);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
