import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {AngularSvgIconModule} from "angular-svg-icon";
import { LoginAndRegistrationComponent } from './login-and-registration.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    LoginAndRegistrationComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    ButtonModule,
    RippleModule,
    AngularSvgIconModule
  ]
})
export class LoginAndRegistrationModule { }
