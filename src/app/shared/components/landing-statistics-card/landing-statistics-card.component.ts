import {Component, Input, OnInit} from '@angular/core';
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
  styleUrls: ['./landing-statistics-card.component.scss']
})
export class LandingStatisticsCardComponent implements OnInit {
  @Input() public allCardStatisticData: LandingStatistic.IStatisticItem[] | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
