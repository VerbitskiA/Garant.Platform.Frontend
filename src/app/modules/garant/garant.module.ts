import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GarantAcceptPaymentComponent} from "./garant-accept-payment/garant-accept-payment.component";
import {GarantConcordComponent} from "./garant-concord/garant-concord.component";
import {GarantContractComponent} from "./garant-contract/garant-contract.component";
import {GarantInitComponent} from "./garant-init/garant-init.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {PipesModule} from "../../core/pipes/pipes.module";
import {MessagesModule} from "primeng/messages";

const components = [
  GarantAcceptPaymentComponent,
  GarantConcordComponent,
  GarantContractComponent,
  GarantInitComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    PipesModule,
    MessagesModule,
  ],
  exports: [...components]
})
export class GarantModule { }
