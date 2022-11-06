import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {API_URL} from "src/app/core/core-urls/api-url";
import {DealInput} from "src/app/models/garant/input/deal-input";
import {CommonDataService} from "src/app/core/services/common/common-data.service";
import {DataService} from "src/app/core/services/common/data-service";
import {GarantService} from "src/app/core/services/garant/garant.service";

@Component({
  selector: "app-garant-concord",
  templateUrl: "./garant-concord.component.html",
  styleUrls: ["./garant-concord.component.scss"]
})
export class GarantConcordComponent implements OnInit {
  oInitData: any = {};
  aMessages: any = [];
  dateStartDialog: string = "";
  chatItemName: string = "";
  message: string = "";
  dialogId: number = 0;
  aInvestInclude: any = [];
  aIterationList: any = [];
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
    this.getDialogMessagesAsync();
  };

  /**
   * Функция получит данные Гаранта на ините.
   * @returns Данные инита страницы.
   */
  private initGarantDataAsync() {
    this.garantService.initGarantDataAsync(2, true, this.dataService.otherId).subscribe((response: any) => {
      this.oInitData = response;
      this.aMessages = response.chatData.messages;
      this.dateStartDialog = response.chatData.dateStartDialog;
      this.chatItemName = this.oInitData.itemTitle;
      this.dialogId = response.chatData.dialogId;
      this.aInvestInclude = JSON.parse(response.investInclude);

      console.log("garant init data stage 2: ", this.oInitData);
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

  public onRouteGarant3Async() {
    this.router.navigate(["/garant/garant-contract"], {queryParams: {stage: 3}});
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
}
