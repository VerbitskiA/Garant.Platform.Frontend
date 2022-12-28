import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {isEmpty} from "lodash";


export namespace LandingFourStepsData {
  export interface IConsultationItem {
    title: string;
    subtitle: string;
    stage: string;
    item_text: string;
    // content__label1: string
    // content__placeholder1: string;

    // content__label2: string;
    // content__placeholder2: string;

    item__button: string;

    item__button2?: string;
    image: string;
    alt: string;
  }
}

@Component({
  selector: 'app-landing-four-steps-card',
  templateUrl: './landing-four-steps-card.component.html',
  styleUrls: ['./landing-four-steps-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingFourStepsCardComponent implements OnInit {
  @Input() public cardTitle: string = "4 шага к безопасной сделке онлайн";
  @Input() public allCardsFourStepsData: LandingFourStepsData.IConsultationItem[] | undefined;

  public get dataIsSets(): boolean {
    return !isEmpty(this.allCardsFourStepsData);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
