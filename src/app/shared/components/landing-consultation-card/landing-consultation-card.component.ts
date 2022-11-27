import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {LandingHeader} from "../landing-header-card/landing-header-card.component";
import {LandingRequestService} from "../../../core/services/landing/landing.service";
import {CommonModels} from "../../../models/common-models";
import CSSVariablesNames = CommonModels.CSSVariablesNames;
import BackgroundColors = CommonModels.BackgroundColors;
import BackgroundColorVariant = CommonModels.BackgroundColorVariant;

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

  public name = "";
  public phoneNumber = "";

  @Input() public cardConsultationData: LandingConsultation.IConsultationItem | undefined;
  @Input() public backgroundColorVariant = BackgroundColorVariant.blue; // первый вариант
  @Output() public cardConsultationEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _renderer: Renderer2,
    private _el: ElementRef
  ) {
  }

  public ngOnInit(): void {
    this._renderer.setProperty(
      this._el.nativeElement,
      'style',
      `${CSSVariablesNames.app_get_call_card}: ${BackgroundColors[this.backgroundColorVariant]}`
    );
  }

  public action(event: any): void {
    this.cardConsultationEvent.emit({name: this.name, phoneNumber: this.phoneNumber});
  }

  public actionChangeColor(): void {
    this.backgroundColorVariant = this.backgroundColorVariant === BackgroundColorVariant.blue ? BackgroundColorVariant.black : BackgroundColorVariant.blue;
    this._renderer.setProperty(
      this._el.nativeElement,
      'style',
      `${CSSVariablesNames.app_get_call_card}: ${BackgroundColors[this.backgroundColorVariant]}`
    );
  }

  public actionChangeColor2(): void {
    this.backgroundColorVariant = this.backgroundColorVariant === BackgroundColorVariant.blue ? BackgroundColorVariant.fuchsia : BackgroundColorVariant.blue;
    this._renderer.setProperty(
      this._el.nativeElement,
      'style',
      `${CSSVariablesNames.app_get_call_card}: ${BackgroundColors[this.backgroundColorVariant]}`
    );
  }


}
