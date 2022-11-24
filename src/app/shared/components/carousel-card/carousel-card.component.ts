import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';


interface CardData {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
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
  constructor() {
  }

  ngOnInit() {
  }

  public testAction(card: CardData): void {
    this.caruselEvent.emit(card);
  }
}
