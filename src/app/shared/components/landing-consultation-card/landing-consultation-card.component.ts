import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewEncapsulation} from '@angular/core';
import {CommonModels} from "../../../models/common-models";
import {CountryISO, PhoneNumberFormat, SearchCountryField} from 'ngx-intl-tel-input';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

    content__button2?: string;
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
  styleUrls: ['./landing-consultation-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingConsultationCardComponent implements OnInit {

  @Input() public cardConsultationData: LandingConsultation.IConsultationItem | undefined;
  @Input() public backgroundColorVariant = BackgroundColorVariant.blue; // первый вариант
  @Output() public cardConsultationEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() consultingFlagClass?=false;
  @Input() dealFlagClass?=false;
  @Input() franchiseFlagClass?=false;

  public separateDialCode = false;
  public SearchCountryField = SearchCountryField;
  public CountryISO = CountryISO;
  public PhoneNumberFormat = PhoneNumberFormat;
  public preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.Georgia, CountryISO.Russia, CountryISO.Ukraine];


  public phoneForm = new FormGroup({
    name: new FormControl(undefined, [Validators.required]),
    phone: new FormControl(undefined, [Validators.required])
  });


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
    this.phoneForm.markAsDirty();
    if (this.phoneForm.valid){
      this.cardConsultationEvent.emit(this.phoneForm.getRawValue());
    }
    console.log(this.phoneForm.valid, this.phoneForm.getRawValue(), event)
  }

  // public actionChangeColor(): void {
  //   this.backgroundColorVariant = this.backgroundColorVariant === BackgroundColorVariant.blue ? BackgroundColorVariant.black : BackgroundColorVariant.blue;
  //   this._renderer.setProperty(
  //     this._el.nativeElement,
  //     'style',
  //     `${CSSVariablesNames.app_get_call_card}: ${BackgroundColors[this.backgroundColorVariant]}`
  //   );
  // }
  //
  // public actionChangeColor2(): void {
  //   this.backgroundColorVariant = this.backgroundColorVariant === BackgroundColorVariant.blue ? BackgroundColorVariant.fuchsia : BackgroundColorVariant.blue;
  //   this._renderer.setProperty(
  //     this._el.nativeElement,
  //     'style',
  //     `${CSSVariablesNames.app_get_call_card}: ${BackgroundColors[this.backgroundColorVariant]}`
  //   );
  // }


}
