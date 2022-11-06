import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {API_URL} from "src/app/core/core-urls/api-url";
import {DocumentInput} from "src/app/models/document/input/document-input";
import {DealInput} from "src/app/models/garant/input/deal-input";
import {CommonDataService} from "src/app/core/services/common/common-data.service";
import {DataService} from "src/app/core/services/common/data-service";
import {GarantService} from "src/app/core/services/garant/garant.service";

@Component({
  selector: "app-garant-contract",
  templateUrl: "./garant-contract.component.html",
  styleUrls: ["./garant-contract.component.scss"]
})

/**
 * Класс модуля Гаранта (страница согласования договора 3 этап).
 */
export class GarantContractComponent implements OnInit {
  oInitData: any = {};
  aMessages: any = [];
  dateStartDialog: string = "";
  chatItemName: string = "";
  message: string = "";
  dialogId: number = 0;
  aInvestInclude: any = [];
  aIterationList: any = [];
  documentFile: any;
  attachmentVendorFileName: string = "";
  attachmentCustomerFileName: string = "";
  isSend: boolean = false;
  isApproveVendorDocment: boolean = false;
  isApproveCustomerDocument: boolean = false;
  aDocumants: string[] = [];
  chatItemUrl: string = "";
  fio: string = "";

  constructor(private http: HttpClient,
              private commonService: CommonDataService,
              private garantService: GarantService,
              private router: Router,
              private dataService: DataService) {

  };

  public ngOnInit() {
    this.initGarantDataAsync();
    this.getAttachmentDocumentNameVendorDealAsync();
    this.getAttachmentDocumentNameCustomerDealAsync();
    this.onCheckApproveDocumentVendorAsync();
    this.onCheckApproveDocumentCustomerAsync();
    this.onGetDocumentsDealAsync();
    this.getDialogMessagesAsync();
  };

  /**
   * Функция получит данные Гаранта на ините.
   * @returns Данные инита страницы.
   */
  private initGarantDataAsync() {
    this.garantService.initGarantDataAsync(3, true, this.dataService.otherId).subscribe((response: any) => {
      this.oInitData = response;
      this.aMessages = response.chatData.messages;
      this.dateStartDialog = response.chatData.dateStartDialog;
      this.chatItemName = this.oInitData.itemTitle;
      this.dialogId = response.chatData.dialogId;
      this.aInvestInclude = JSON.parse(response.investInclude);

      console.log("garant init data stage 3: ", this.oInitData);
      console.log("aInvestInclude: ", this.aInvestInclude);
    });
  };

  /**
   * Функция подтвердит продажу в сделке.
   */
  public onAcceptDealAsync() {
    let dataInput = new DealInput();

    if (this.oInitData !== null && this.oInitData !== undefined) {
      dataInput.DealItemId = this.oInitData.itemDealId;
      dataInput.OrderType = this.oInitData.itemDealType;
    }

    this.http.post(API_URL.apiUrl.concat("/garant/accept-deal"), dataInput)
      .subscribe((response: any) => console.log(response), (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  };

  // TODO: Вынести в общий сервис сообщений, как только он будет создан.
  public onSendMessageAsync() {
    console.log("Сообщение", this.message);

    this.http.post(API_URL.apiUrl.concat("/chat/send-message"), {Message: this.message, DialogId: this.dialogId})
      .subscribe((response: any) => {
        console.log("Сообщения: ", response.messages);
        this.aMessages = response.messages;
        this.dataService.dialogId = response.dialogId;
        this.message = "";
      }, (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция прикрепит и отправит файл договора продавца.
   * @param e - Данные документа.
   */
  public onAttachmentVendorDocument(e: any) {
    console.log("onAttachmentVendorDocument", e);
    this.documentFile = e.target.files[0];

    if (e.target.files.length > 0) {
      this.attachmentDealVendorDocumentAsync();
    }
  };

  /**
   * Функция прикрепит и отправит файл договора покупателя.
   * @param e - Данные документа.
   */
  public onAttachmentCustomerDocument(e: any) {
    console.log("onAttachmentCustomerDocument", e);
    this.documentFile = e.target.files[0];

    if (e.target.files.length > 0) {
      this.attachmentDealCustomerDocumentAsync();
    }
  };

  /**
   * Функция прикрепит документ договора продавца к сделке.
   */
  private attachmentDealVendorDocumentAsync() {
    let formData = new FormData();
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;
    documentInput.DocumentType = "DocumentVendor";
    documentInput.IsDealDocument = true;

    formData.append("files", this.documentFile);
    formData.append("documentData", JSON.stringify(documentInput));

    this.http.post(API_URL.apiUrl.concat("/document/attachment-vendor-document-deal"), formData)
      .subscribe((response: any) => console.log("Документ сделки: ", response), (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция прикрепит документ договора покупателя к сделке.
   */
  private attachmentDealCustomerDocumentAsync() {
    let formData = new FormData();
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;
    documentInput.DocumentType = "DocumentCustomer";
    documentInput.IsDealDocument = true;

    formData.append("files", this.documentFile);
    formData.append("documentData", JSON.stringify(documentInput));

    this.http.post(API_URL.apiUrl.concat("/document/attachment-customer-document-deal"), formData)
      .subscribe((response: any) => console.log("Документ сделки: ", response), (err) => {
        throw new Error(err);
      });
  };

  /**
   * Функция отправит договор продавца.
   * @returns - Результат отправки.
   */
  public onSendDocumentVendorAsync() {
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;
    documentInput.DocumentType = "DocumentVendor";
    documentInput.IsDealDocument = true;

    if (documentInput.DocumentItemId > 0) {
      return this.http.post(API_URL.apiUrl.concat("/document/send-vendor-document-deal"), documentInput)
        .subscribe((response: any) => {
          if (response) {
            this.isSend = true;
            this.onGetDocumentsDealAsync();
          }
        }, (err) => {
          throw new Error(err);
        });
    }

    return false;
  };

  /**
   * Функция получит название файла для согласования покупателю.
   */
  private getAttachmentDocumentNameVendorDealAsync() {
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;

    if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
      this.http.post(API_URL.apiUrl.concat("/document/get-attachment-document-vendor-deal-name"), documentInput)
        .subscribe((response: any) => this.attachmentVendorFileName = response.documentName, (err) => {
          throw new Error(err);
        });
    }
  };

  /**
   * Функция получит название файла для согласования продавцу.
   */
  private getAttachmentDocumentNameCustomerDealAsync() {
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;

    if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
      this.http.post(API_URL.apiUrl.concat("/document/get-attachment-document-customer-deal-name"), documentInput)
        .subscribe((response: any) => this.attachmentCustomerFileName = response.documentName, (err) => {
          throw new Error(err);
        });
    }
  };

  /**
   * Функция проверит, подтвердил ли покупатель догововор продавца.
   */
  private onCheckApproveDocumentVendorAsync() {
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;

    if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
      this.http.post(API_URL.apiUrl.concat("/document/check-approve-document-vendor"), documentInput)
        .subscribe((response: any) => {
          if (response) {
            this.isApproveVendorDocment = true;
          }
          console.log("approve document vendor: ", response);
        }, (err) => {
          throw new Error(err);
        });
    }
  }

  /**
   * Функция проверит, подтвердил ли продавец догововор покупателя.
   */
  private onCheckApproveDocumentCustomerAsync() {
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;

    if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
      this.http.post(API_URL.apiUrl.concat("/document/check-approve-document-customer"), documentInput)
        .subscribe((response: any) => {
          if (response) {
            this.isApproveCustomerDocument = true;
          }
          console.log("approve document customer: ", response);
        }, (err) => {
          throw new Error(err);
        });
    }
  };

  public onSendDocumentCustomerAsync() {
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;
    documentInput.DocumentType = "DocumentCustomer";
    documentInput.IsDealDocument = true;

    if (documentInput.DocumentItemId > 0) {
      return this.http.post(API_URL.apiUrl.concat("/document/send-customer-document-deal"), documentInput)
        .subscribe((response: any) => {
          console.log("Отправка документа: ", response);
          if (response) {
            this.isSend = true;
            this.onGetDocumentsDealAsync();
          }
        }, (err) => {
          throw new Error(err);
        });
    }
    return false;
  };

  /**
   * Функция подтвердит договор продавца.
   */
  public onApproveVendorDocumentAsync() {
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;

    if (documentInput.DocumentItemId > 0) {
      this.http.post(API_URL.apiUrl.concat("/document/approve-document-vendor"), documentInput)
        .subscribe((response: any) => {
          if (response) {
            this.isApproveVendorDocment = true;
          }
          console.log("approve vendor: ", response);
        }, (err) => {
          throw new Error(err);
        });
    }
  };

  /**
   * Функция подтвердит договор покупателя.
   */
  public onApproveCustomerDocumentAsync() {
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;

    if (documentInput.DocumentItemId > 0) {
      this.http.post(API_URL.apiUrl.concat("/document/approve-document-customer"), documentInput)
        .subscribe((response: any) => {
          if (response) {
            this.isApproveCustomerDocument = true;
          }
          console.log("approve customer: ", response);
        }, (err) => {
          throw new Error(err);
        });
    }
  };

  /**
   * Функция получит список документов сделки.
   * @returns - Список документов.
   */
  private onGetDocumentsDealAsync() {
    let documentInput = new DocumentInput();
    documentInput.DocumentItemId = this.oInitData.itemDealId;
    if (documentInput.DocumentItemId > 0) {
      this.http.post(API_URL.apiUrl.concat("/document/get-documents-deal"), documentInput)
        .subscribe((response: any) => this.aDocumants = response.map((item: any) => item.documentName), (err) => {
          throw new Error(err);
        });
    }
  };

  private getDialogMessagesAsync() {
    this.commonService.getDialogMessagesAsync(this.dialogId, "", "").subscribe((data: any) => {
      console.log("Список сообщений диалога: ", data);
      this.aMessages = data.messages;
      this.fio = data.fullName;
      this.dateStartDialog = data.dateStartDialog;
      // this.chatItemName = data.chatItemName;
      this.dialogId = data.dialogId;
      this.chatItemUrl = data.url;
    });
  };

  public onRouteGarant4Async() {
    this.router.navigate(["/garant/garant-accept-payment"], {queryParams: {stage: 4}});
  };
}
