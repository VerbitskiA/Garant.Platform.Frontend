import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ComponentType} from "@angular/cdk/overlay";
import {GarItemComponent} from "../../../gar-lib/gar-item/gar-item.component";


interface CardData {
  id?: string;
  name?: string;
  description?: string;
  time?: string;
  price?: string;
}


@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselCardComponent {
  @Input() public cardsData: CardData[] = [];
  @Output() public caruselEvent: EventEmitter<CardData> = new EventEmitter<CardData>();
  @Input() public numVisible!: number;
  @Input() public style: any = {};
  @Input()
  template: any;

  constructor() {
  }

  ngOnInit() {
  }


  public testAction(card: CardData): void {
    alert('card')
    this.caruselEvent.emit(card);
  }

  responsiveOptions: any[] = [

    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    }
  ]
}
