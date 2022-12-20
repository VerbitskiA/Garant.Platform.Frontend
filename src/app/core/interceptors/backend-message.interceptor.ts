import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor as Interceptor, HttpRequest} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastNotificationsModel, ToastNotificationsService} from "../services/toast-notifications.service";
import ToastVariant = ToastNotificationsModel.ToastVariant;
import ResponseCodes = ResponsesModel.ResponseCodes;
import {ResponsesModel} from "../../models/responses.model";


@Injectable({providedIn: 'root'})
export class BackendMessageInterceptor implements Interceptor {

  constructor(private notificationService: ToastNotificationsService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // tap((data: any) => this.sendToast(data)),
      catchError((error: any) => {
        this.sendToast(error);
        return throwError(error);
      })
    );
  }

  private sendToast(data: any): void{
    if (data?.statusCode) {
      this.notificationService.showNotification(this.getToastVariant(data?.statusCode), {message: data?.messsage /*?? ResponseDefaultMessages[Number(data.statusCode)]*/});
    }else {
      this.notificationService.showNotification(ToastVariant.ERROR, {message: 'Internal or request error' /*?? ResponseDefaultMessages[Number(data.statusCode)]*/});
    }
  }

  private getToastVariant(statusCode: ResponseCodes): ToastVariant{
    const firstNumberInCode: number = Number(statusCode.toString()[0]);
    switch (firstNumberInCode) {
      case 1: return ToastVariant.INFO;
      case 2: return ToastVariant.SUCCESS;
      case 4: return ToastVariant.WARN;
      case 5: return ToastVariant.ERROR;
      default: return ToastVariant.INFO;
    }
  }
}
