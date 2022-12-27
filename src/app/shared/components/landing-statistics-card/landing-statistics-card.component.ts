import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {isEmpty} from "lodash";
import {LandingConsultation} from "../landing-consultation-card/landing-consultation-card.component";

export namespace LandingStatistic {
  export interface IStatisticItem {
    item_number: string;
    item_text: string;
  }
}

@Component({
  selector: 'app-landing-statistics-card',
  templateUrl: './landing-statistics-card.component.html',
  styleUrls: ['./landing-statistics-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingStatisticsCardComponent implements OnInit {
  @Input() public allCardStatisticData: LandingStatistic.IStatisticItem[] | undefined;

  public get dataIsSets(): boolean {
    return !isEmpty(this.allCardStatisticData);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
