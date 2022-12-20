import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

export namespace ToastNotificationsModel{
  export enum ToastVariant {
    SUCCESS = 1,
    INFO,
    WARN,
    ERROR
  }
  export const ToastVariantString = {
    [ToastVariant.SUCCESS]: 'success',
    [ToastVariant.INFO]: 'info',
    [ToastVariant.WARN]: 'warn',
    [ToastVariant.ERROR]: 'error'
  }

  export interface ToastOptions{
    message: string;
    summary?: string;
  }
}


@Injectable({providedIn: 'root'})
export class ToastNotificationsService {
  constructor(private messageService: MessageService) {
  }

  public showNotification(toastVariant: ToastNotificationsModel.ToastVariant, toastOptions: ToastNotificationsModel.ToastOptions): void {
    this.messageService.add({
      severity: ToastNotificationsModel.ToastVariantString[toastVariant],
      summary: toastOptions?.summary ?? this.getDefaultSummary(toastVariant),
      detail: toastOptions?.message
    });
  }

  private getDefaultSummary(toastVariant: ToastNotificationsModel.ToastVariant): string {
    switch (toastVariant) {
      case ToastNotificationsModel.ToastVariant.SUCCESS: return 'Success';
      case ToastNotificationsModel.ToastVariant.INFO: return 'Information';
      case ToastNotificationsModel.ToastVariant.WARN: return 'Warning';
      case ToastNotificationsModel.ToastVariant.ERROR: return 'Error';
    }
  }
}
