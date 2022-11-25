import {Component, OnInit} from '@angular/core';

export namespace LandingHeader {
  export interface IHeaderItem {
    title: string;
    sublitle: string;
    content_text: string;
    content__button: string;
    content__button1?: string;

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
  styleUrls: ['./landing-header-card.component.scss']
})
export class LandingHeaderCardComponent implements OnInit {

  categories: LandingHeader.IHeaderItem[] = [
    {
      title: 'Консультация',
      sublitle: 'по покупке бизнеса и франшиз',
      content_text: 'с сопровождением сделки и составлением договоров',
      content__button: 'Получить консультацию',
      content__button1: 'Консультация',
      image: '../../../../assets/images/consulting-landing/Group.png',
      alt: 'Изображение блокнота, ручки и портфеля',
      image1: '../../../../assets/images/consulting-landing/Group1.png',
      alt2: 'Изображение блокнота, ручки и портфеля',
    },
    //{name: this.headerString.home, icon: 'category-home', link: '/'},

    {
      title: 'Онлайн сделка',
      sublitle: 'по покупке бизнеса',
      content_text: 'или франшизы',
      content__button: 'Как начать сделку?',
      image: '../../../../assets/images/deal-landing/shield.png',
      alt: 'Изображение щита',
    },

    {
      title: 'Создание',
      sublitle: 'и упаковка франшиз',
      content_text: 'с бесплатным размещением в каталоге',
      content__button: 'Бесплатная консультация',

      image: '../../../../assets/images/franchise-landing/desk.png',
      alt: 'Изображение стола, монеты и %',
      image1: '../../../../assets/images/franchise-landing/desk1.png',
      alt1: 'Изображение стола, монеты и %',
      image2: '../../../../assets/images/franchise-landing/desk2.png',
      alt2: 'Изображение стола, монеты и %',
    },
  ];


  constructor() {
  }

  ngOnInit(): void {
  }


}
