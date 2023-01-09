import {Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {isEmpty} from "lodash";
import {CommonModels} from "../../../models/common-models";
import BackgroundColorVariant = CommonModels.BackgroundColorVariant;
import CSSVariablesNames = CommonModels.CSSVariablesNames;
import BackgroundColors = CommonModels.BackgroundColors;

export namespace LandingPacksData {
  export interface IConsultationItem {
    image_pack?: string;
    alt?: string;
    title: string;
    item_text: string;

    item__yes_image: string;
    item__no_image: string;
    item__list: { item_class: string; item__tool?: string; }[];

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

  @Input() public backgroundColorVariant = BackgroundColorVariant.blue;

  constructor(
    private _renderer: Renderer2,
    private _el: ElementRef
  ) {
  }

  public ngOnInit(): void {
    this._renderer.setProperty(
      this._el.nativeElement,
      'style',
      `${CSSVariablesNames.app_get_call_card}: ${BackgroundColors[this.backgroundColorVariant]}`
    );
  }

}
