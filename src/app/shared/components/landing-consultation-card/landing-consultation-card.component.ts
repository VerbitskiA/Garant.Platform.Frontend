import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LandingHeader} from "../landing-header-card/landing-header-card.component";
import {LandingRequestService} from "../../../core/services/landing/landing.service";

export namespace LandingConsultation {
  export interface IConsultationItem {
    title: string;
    subtitle: string;
    content_text: string;
    content__label1: string
    content__placeholder1: string;

    content__label2: string;
    content__placeholder2: string;

    content__button: string;

    image: string;
    alt: string;

    link?: string;
    linkAction?: () => void;
  }


  // export const routerLink = {
  //   sel: '',
  // }
}

@Component({
  selector: 'app-landing-consultation-card',
  templateUrl: './landing-consultation-card.component.html',
  styleUrls: ['./landing-consultation-card.component.scss']
})
export class LandingConsultationCardComponent implements OnInit {

  name: string = "";
  phoneNumber: string = "";

  @Input() public cardConsultationData: LandingConsultation.IConsultationItem | undefined;
  @Output() public cardConsultationEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private requestService: LandingRequestService) {
  }

  ngOnInit(): void {
  }

  public action(event: any): void{
    this.cardConsultationEvent.emit(this.cardConsultationData?.title);
  }

  public onSendLandingRequestAsync(name: string, phoneNumber: string) {
    this.requestService.sendLandingRequestAsync(name, phoneNumber, "Консалтинг").subscribe(() => {
      this.name = '';
      this.phoneNumber = ''
    });
  };

}
