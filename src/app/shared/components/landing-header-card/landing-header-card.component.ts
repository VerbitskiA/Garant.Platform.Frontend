import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

export namespace LandingHeader {
  export interface IHeaderItem {
    title: string;
    subtitle: string;
    content_text: string;
    content__button: string;
    content__button2?: string;

    image: string;
    alt: string;

    image1?: string;
    alt1?: string;

    image2?: string;
    alt2?: string;

    link?: string;
    linkAction?: () => void;
  }

  // export const routerLink = {
  //   sel: '',
  // }
}

@Component({
  selector: 'app-landing-header-card',
  templateUrl: './landing-header-card.component.html',
  styleUrls: ['./landing-header-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingHeaderCardComponent implements OnInit {

  @Input() public cardData: LandingHeader.IHeaderItem | undefined;
  @Input() consultingFlagClass?=false;
  @Input() dealFlagClass?=false;
  @Input() franchiseFlagClass?=false;
  @Output() public cardEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit(): void {
  }

  public action(event: any): void{
    this.cardEvent.emit(this.cardData?.title);
  }
}
