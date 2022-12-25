import {Component, Input, OnInit} from '@angular/core';
import {LandingHeader} from "../landing-header-card/landing-header-card.component";

export namespace LandingPromo {
  export interface IPromoItem {
    title: string;
    subtitle: string;
    button_accept: string;
    button_later: string;
  }
}
@Component({
  selector: 'app-landing-promo-card',
  templateUrl: './landing-promo-card.component.html',
  styleUrls: ['./landing-promo-card.component.scss']
})
export class LandingPromoCardComponent implements OnInit {

  @Input() public cardData: LandingPromo.IPromoItem | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
