import {Component, EventEmitter, Input, Output} from '@angular/core';




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

})
export class CarouselCardComponent {
  @Input() public cardsData: CardData[] = [];
  @Output() public caruselEvent: EventEmitter<CardData> = new EventEmitter<CardData>();
  @Input() public numVisible!: number;
  @Input() template: any;
  @Input() public responsiveOptions:any
  @Input() topMain=false;
  @Input() main=false;
  @Input() templateButton:any

  ngOnInit() {
  }


  public testAction(card: CardData): void {
    alert('card')
    this.caruselEvent.emit(card);
  }


}
