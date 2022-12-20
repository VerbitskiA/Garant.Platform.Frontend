import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { DocumentInput } from "src/app/models/document/input/document-input";
import { DealInput } from "src/app/models/garant/input/deal-input";
import { PaymentIterationCustomerInput } from "src/app/models/garant/input/payment-iteration-input";
import { GetPaymentStateOutput } from "src/app/models/garant/output/get-payment-state-output";
import { CommonDataService } from "src/app/services/common/common-data.service";
import { DataService } from "src/app/services/common/data-service";
import { GarantService } from "src/app/services/garant/garant.service";

@Component({
    selector: "garant-accept-payment",
    templateUrl: "./garant-accept-payment.component.html",
    styleUrls: ["./garant-accept-payment.component.scss"]
})

/** 
 * Класс модуля Гаранта (страница оплаты и подтверждения этапов 4 этап).
 */
export class GarantAcceptPaymentModule implements OnInit {    
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
    actFile: any;
    aVendorActs: any = [];
    isEndDeal: boolean = false;
    aCustomerActs: any = [];
    aApproveVendorActs: any;
    aApproveCustomerActs: string[] = [];
    aActsPaymentStatuses: GetPaymentStateOutput[] = [];    

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private garantService: GarantService,
        private router: Router,
        private dataService: DataService,
        private route: ActivatedRoute) {

    };

    public async ngOnInit() {
        await this.initGarantDataAsync();
        await this.getAttachmentDocumentNameVendorDealAsync();
        await this.getAttachmentDocumentNameCustomerDealAsync();
        await this.onCheckApproveDocumentVendorAsync();
        await this.onCheckApproveDocumentCustomerAsync();
        await this.onGetDocumentsDealAsync();
        await this.getDialogMessagesAsync();
        await this.getApproveVendorActsAsync();

        if (!this.oInitData.isOwner) {
            await this.getPaymentStateAsync();
        }
    };    

    /**
     * Функция получит данные Гаранта на ините.
     * @returns Данные инита страницы.
     */
    private async initGarantDataAsync() {
        try {           
            await this.garantService.initGarantDataAsync(4, true, this.dataService.otherId).then((response: any) => {
                this.oInitData = response;                
                this.dialogId = response.chatData.dialogId;
                this.dateStartDialog = response.chatData.dateStartDialog;
                this.chatItemName = this.oInitData.itemTitle;
                this.aInvestInclude = JSON.parse(response.investInclude);

                this.loadVendorActsAsync();
                this.loadCustomerActsAsync();

                console.log("garant init data stage 4: ", this.oInitData);
                console.log("aInvestInclude: ", this.aInvestInclude);
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция подтвердит продажу в сделке.
     */
    public async onAcceptDealAsync() {
        try {            
            let dataInput = new DealInput();

            if (this.oInitData !== null && this.oInitData !== undefined) {
                dataInput.DealItemId = this.oInitData.itemDealId;
                dataInput.OrderType = this.oInitData.itemDealType;
            }            

            await this.http.post(API_URL.apiUrl.concat("/garant/accept-deal"), dataInput)
                .subscribe({
                    next: (response: any) => {
                        console.log(response);
                    },

                    error: (err) => {
                        this.commonService.routeToStart(err);
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };    

    // TODO: Вынести в общий сервис сообщений, как только он будет создан.
    public async onSendMessageAsync() {
        console.log("Сообщение", this.message);

        try {                
            await this.http.post(API_URL.apiUrl.concat("/chat/send-message"), {
                Message: this.message,
                DialogId: this.dialogId
            })
                .subscribe({
                    next: (response: any) => {
                        console.log("Сообщения: ", response.messages);
                        this.aMessages = response.messages; 
                        this.dataService.dialogId = response.dialogId;      
                        this.message = "";                 
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция прикрепит и отправит файл договора продавца.
     * @param e - Данные документа.
     */
    public async onAttachmentVendorDocument(e: any) {
        console.log("onAttachmentVendorDocument", e);
        this.documentFile = e.target.files[0];
        
        if (e.target.files.length > 0) {
            await this.attachmentDealVendorDocumentAsync();
        }
    };

    /**
     * Функция прикрепит и отправит файл договора покупателя.
     * @param e - Данные документа.
     */
    public async onAttachmentCustomerDocument(e: any) {
        console.log("onAttachmentCustomerDocument", e);
        this.documentFile = e.target.files[0];
        
        if (e.target.files.length > 0) {
            await this.attachmentDealCustomerDocumentAsync();
        }
    };    

    /**
     * Функция прикрепит документ договора продавца к сделке.
     */
    private async attachmentDealVendorDocumentAsync() {
        try {                
            let formData = new FormData();
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = "DocumentVendor";
            documentInput.IsDealDocument = true;
            
            formData.append("files", this.documentFile);      
            formData.append("documentData", JSON.stringify(documentInput));

            await this.http.post(API_URL.apiUrl.concat("/document/attachment-vendor-document-deal"), formData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Документ сделки: ", response);                                  
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция прикрепит документ договора покупателя к сделке.
     */
     private async attachmentDealCustomerDocumentAsync() {
        try {                
            let formData = new FormData();
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = "DocumentCustomer";
            documentInput.IsDealDocument = true;
            
            formData.append("files", this.documentFile);      
            formData.append("documentData", JSON.stringify(documentInput));

            await this.http.post(API_URL.apiUrl.concat("/document/attachment-customer-document-deal"), formData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Документ сделки: ", response);                                  
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция отправит договор продавца.
     * @returns - Результат отправки.
     */
    public async onSendDocumentVendorAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = "DocumentVendor";
            documentInput.IsDealDocument = true;                    

            if (documentInput.DocumentItemId > 0) {
                return await this.http.post(API_URL.apiUrl.concat("/document/send-vendor-document-deal"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Отправка документа: ", response);

                            if (response) {
                                this.isSend = true;
                                this.onGetDocumentsDealAsync();
                            }
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }

            return false;
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит название файла для согласования покупателю.
     */
    private async getAttachmentDocumentNameVendorDealAsync() {
        try {        
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;

            if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/get-attachment-document-vendor-deal-name"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            this.attachmentVendorFileName = response.documentName;
                            console.log("Название документа: ", response.documentName);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит название файла для согласования продавцу.
     */
     private async getAttachmentDocumentNameCustomerDealAsync() {
        try {        
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;

            if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/get-attachment-document-customer-deal-name"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            this.attachmentCustomerFileName = response.documentName;
                            console.log("Название документа: ", response.documentName);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция проверит, подтвердил ли покупатель догововор продавца.
     */
    private async onCheckApproveDocumentVendorAsync() {
        try {
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;

            if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/check-approve-document-vendor"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                this.isApproveVendorDocment = true;
                            }
                           
                            console.log("approve document vendor: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

     /**
     * Функция проверит, подтвердил ли продавец догововор покупателя.
     */
      private async onCheckApproveDocumentCustomerAsync() {
        try {
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;

            if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/check-approve-document-customer"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                this.isApproveCustomerDocument = true;
                            }
                           
                            console.log("approve document customer: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public async onSendDocumentCustomerAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = "DocumentCustomer";
            documentInput.IsDealDocument = true;                    

            if (documentInput.DocumentItemId > 0) {
                return await this.http.post(API_URL.apiUrl.concat("/document/send-customer-document-deal"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Отправка документа: ", response);

                            if (response) {
                                this.isSend = true;
                                this.onGetDocumentsDealAsync();
                            }
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }

            return false;
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция подтвердит договор продавца.
     */
    public async onApproveVendorDocumentAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;            

            if (documentInput.DocumentItemId > 0) {
                await this.http.post(API_URL.apiUrl.concat("/document/approve-document-vendor"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                this.isApproveVendorDocment = true;
                            }

                            console.log("approve vendor: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция подтвердит договор покупателя.
     */
     public async onApproveCustomerDocumentAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;            

            if (documentInput.DocumentItemId > 0) {
                await this.http.post(API_URL.apiUrl.concat("/document/approve-document-customer"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                this.isApproveCustomerDocument = true;
                            }

                            console.log("approve customer: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит список документов сделки.
     * @returns - Список документов.
     */
     private async onGetDocumentsDealAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;            

            if (documentInput.DocumentItemId > 0) {
                await this.http.post(API_URL.apiUrl.concat("/document/get-documents-deal"), documentInput)
                    .subscribe({
                        next: (response: any) => {                                                        
                            this.aDocumants = response.map((item: any) => item.documentName);
                              
                            console.log("Документы сделки: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    private async getDialogMessagesAsync() {
        try {           
            await this.commonService.getDialogMessagesAsync(this.dialogId, "", "").then((data: any) => {
                console.log("Список сообщений диалога: ", data);                
                this.aMessages = data.messages;
                this.fio = data.fullName;
                this.dateStartDialog = data.dateStartDialog;
                // this.chatItemName = data.chatItemName;
                this.dialogId = data.dialogId;
                this.chatItemUrl = data.url;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public onAttachmentActDocument(e: any) {
        this.actFile = e.target.files[0];

        if (e.target.files.length > 0) {
            console.log("act attach");            
        }
    };

    /**
     * Функция прикрепит документ акта в зависимости от номера этапа.
     * @returns - Данные добавленного акта.
     */
    public async onAttachDocumentActAsync(i: number) {
        try {                
            let documentInput = new DocumentInput();       
            let formData = new FormData();          
            documentInput.DocumentItemId = this.oInitData.itemDealId;   
            documentInput.IsDealDocument = true;    
            
            console.log("onAttachmentVendorDocument");     
            console.log("actFile", this.actFile);  
            console.log("oInitData", this.oInitData);  
            console.log("iterationNumber", i);  
            
            // Если первый акт, то поставит 1.
            if (i == 0) {
                i = 1;
            }

            else {
                i++;
            }

            // Проставит название акта.
            // Если владелец.
            if (this.oInitData.isOwner) {                
                documentInput.DocumentType = "DocumentVendorAct" + i;
            }

            // Если не владелец.
            if (!this.oInitData.isOwner) {
                documentInput.DocumentType = "DocumentCustomerAct" + i;
            }                              
            
            formData.append("files", this.actFile);      
            formData.append("documentData", JSON.stringify(documentInput));

            if (documentInput.DocumentItemId > 0) {
                await this.http.post(API_URL.apiUrl.concat("/document/attachment-act"), formData)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Документ акта: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит список актов продавца.
     * @returns - Список актов.
     */
    private async loadVendorActsAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;            

            if (documentInput.DocumentItemId > 0) {
                await this.http.post(API_URL.apiUrl.concat("/document/get-vendor-acts"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            this.aVendorActs = response;
                            console.log("Акты продавца: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит список актов покупателя.
     * @returns - Список актов.
     */
     private async loadCustomerActsAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;            

            if (documentInput.DocumentItemId > 0) {
                await this.http.post(API_URL.apiUrl.concat("/document/get-customer-acts"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            this.aCustomerActs = response;
                            console.log("Акты покупателя: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция подтвердит акт продавца покупателем.
     * @param documentType - Тип акта.
     * @returns - Флаг подтверждения.
     */
    public async onApproveDocumentActVendorAsync(documentType: string) {
        try {
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = documentType;

            if (documentInput.DocumentItemId > 0
                && documentInput.DocumentItemId !== null
                && documentInput.DocumentType !== ""
                && documentInput.DocumentType !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/approve-act-vendor"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                var dublicate = this.aApproveVendorActs.filter((item: any) => item.documentType == documentType);

                                if (dublicate == null) {
                                    this.aApproveVendorActs.push(documentType);    
                                }                                                             
                            }
                           
                            console.log("approve vendor act " + documentType, response);
                            console.log("aApproveVendorActs: " + this.aApproveVendorActs);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            this.commonService.routeToStart(e);
            throw new Error(e);
        }
    };

    /**
     * Функция получит список подтвержденных актов продавца.
     * @returns - Список актов.
     */
    private async getApproveVendorActsAsync() {
        try {
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;

            if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/get-approve-vendor-acts"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response.length > 0) {
                                this.aApproveVendorActs = response;                                           
                            }
                           
                            console.log("aApproveVendorActs: " + this.aApproveVendorActs);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            this.commonService.routeToStart(e);
            throw new Error(e);
        }
    };

    /**
     * Функция подтвердит акт покупателя продавцом.
     * @param documentType - Тип акта.
     * @returns - Флаг подтверждения.
     */
     public async onApproveDocumentActCustomerAsync(documentType: string) {
        try {
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = documentType;

            if (documentInput.DocumentItemId > 0
                && documentInput.DocumentItemId !== null
                && documentInput.DocumentType !== ""
                && documentInput.DocumentType !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/approve-act-customer"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                var dublicate = this.aApproveCustomerActs.filter((item: any) => item.documentType == documentType);

                                if (dublicate == null) {
                                    this.aApproveCustomerActs.push(documentType);    
                                }                                                             
                            }
                           
                            console.log("approve customer act " + documentType, response);
                            console.log("aApproveCustomerActs: " + this.aApproveCustomerActs);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            this.commonService.routeToStart(e);
            throw new Error(e);
        }
    };

    /**
     * Функция создаст платеж и спишет оплату 
     * @param i - Номер итерации этапа.
     */
    public async onPaymentIterationCustomerAsync(i: number) {
        try {            
            let paymentInput = new PaymentIterationCustomerInput();
            paymentInput.OriginalId = this.oInitData.itemDealId;  

            if (i == 0) {
                i = 1;
            }

            else {
                i++;
            }         

            paymentInput.Iteration = i;
            paymentInput.OrderType = this.oInitData.itemDealType;

            if (paymentInput.OriginalId > 0
                && paymentInput.OriginalId !== null
                && paymentInput.OrderType !== ""
                && paymentInput.OrderType !== null) {
                await this.http.post(API_URL.apiUrl.concat("/garant/payment-iteration-customer"), paymentInput)
                    .subscribe({
                        next: (response: any) => {
                            console.log("payment iteration customer: " + i + " ок", response);    

                            // Если платеж создан успешно.
                            if (response.success) {
                                // var paymentStatus = new GetPaymentStateOutput();
                                // paymentStatus.status = response.status;

                                // if (i <= 0) {
                                //     i = paymentStatus.iteration;
                                // }

                                // else {
                                //     paymentStatus.iteration = i;
                                // }

                                // paymentStatus.iteration = i;

                                // var checkDublicate = this.aActsPaymentStatuses.find((item: GetPaymentStateOutput) => item.iteration == i);

                                // if (checkDublicate == null) {
                                //     this.aActsPaymentStatuses.push(paymentStatus);
                                //     console.log("aActsPaymentStatuses", this.aActsPaymentStatuses);
                                // }                                         
                                
                                // Запишет переход для периодического опрашивания бэка на статус платежа.
                                this.commonService.setTransitionAsync(this.oInitData.itemDealId, "PaymentAct", response.paymentId, "PaymentAct").then((data: any) => {
                                    console.log("Переход записан:", data);
                                });
                            }                                           
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            this.commonService.routeToStart(e);
            throw new Error(e);
        }
    };

    /**
     * Функция будет опрашивать статус платежа.
     */
    private async getPaymentStateAsync() {
        try {            
            await this.commonService.getTransitionWithParamsAsync(this.oInitData.itemDealId).then((data: any) => {
                console.log("Переход получен:", data);
                
                if (+data.otherId > 0 && data.referenceId > 0) {
                    this.garantService.checkPaymentStateAsync(data.otherId, data.referenceId, this.oInitData.itemDealId, this.oInitData.itemDealType);                    
                }                
            });
        }

        catch (e: any) {
            this.commonService.routeToStart(e);
            throw new Error(e);
        }
    };
}