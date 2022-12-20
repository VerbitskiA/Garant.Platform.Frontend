import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConvertStringToNumberPipe} from "./convert-string-to-number.pipe";
import {FormatPriceGarantPipe} from "./format-price.pipe";
import {TrustUrlPipe} from "./trust-url.pipe";
import {PriceFormatPipe} from "./priceFormat.pipe";
import {SelectionByPropertyPipe} from "./selection-by-property.pipe";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConvertStringToNumberPipe,
    FormatPriceGarantPipe,
    TrustUrlPipe,
    PriceFormatPipe,
    SelectionByPropertyPipe
  ],
  exports: [
    ConvertStringToNumberPipe,
    FormatPriceGarantPipe,
    TrustUrlPipe,
    PriceFormatPipe,
    SelectionByPropertyPipe
  ]
})
export class PipesModule {
}
