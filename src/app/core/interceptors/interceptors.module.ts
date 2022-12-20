import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ParamInterceptor} from "./api-interceptor";
import {BackendMessageInterceptor} from "./backend-message.interceptor";
import {SafeHttpParamEncoderInterceptor} from "./safe-http-param-encoder.interceptor";


@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendMessageInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SafeHttpParamEncoderInterceptor,
      multi: true,
    }
  ]
})
export class InterceptorsModule { }
