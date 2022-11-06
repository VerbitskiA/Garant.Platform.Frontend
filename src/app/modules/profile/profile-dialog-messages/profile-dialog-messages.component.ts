import {HttpClient} from "@angular/common/http";
import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {API_URL} from "src/app/core/core-urls/api-url";
import {CommonDataService} from "src/app/core/services/common/common-data.service";
import {DataService} from "src/app/core/services/common/data-service";

@Component({
  selector: "app-profile-dialog-messages",
  templateUrl: "./profile-dialog-messages.component.html",
  styleUrls: ["./profile-dialog-messages.component.scss"]
})

/**
 * Класс модуля профиля пользователя (сообщения диалога).
 */
export class ProfileDialogMessagesComponent implements OnInit, AfterViewChecked {
  aMessages: any = [];
  transitionId: number = 0;
  typeItem: string = "";
  otherId: string = "";
  fio: string = "";
  dateStartDialog: string = "";
  message: string = "";
  referenceId: number = 0;
  chatItemName: string = "";
  dialogId: number = 0;
  chatItemUrl: string = "";
  routeParam: any;

  @ViewChild('chatBox') private chatBoxScroll!: ElementRef<HTMLDivElement>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private commonService: CommonDataService,
              private dataService: DataService) {
    this.routeParam = this.route.snapshot.queryParams;
  };

  public ngOnInit() {
    this.getTransitionAsync();
    this.getDialogMessagesAsync();
    this.scrollToBottom();
  };

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.chatBoxScroll.nativeElement.scrollTop = this.chatBoxScroll.nativeElement.scrollHeight;
  }

  private getDialogMessagesAsync() {
    this.commonService.getDialogMessagesAsync(
      this.transitionId <= 0 ? this.route.snapshot.queryParams["dialogId"] : this.dataService.dialogId,
      this.typeItem ?? "",
      this.otherId ?? ""
    ).subscribe((data: any) => {
      console.log("Список сообщений диалога: ", data);
      this.aMessages = data.messages;
      this.fio = data.fullName;
      this.dateStartDialog = data.dateStartDialog;
      this.chatItemName = data.chatItemName;
      this.dialogId = data.dialogId;
      this.chatItemUrl = data.url;
    });
  };

  private getTransitionAsync() {
    this.commonService.getTransitionAsync(this.routeParam).subscribe((data: any) => {
      console.log("Переход получен:", data);
      this.transitionId = data.referenceId;
      this.typeItem = data.transitionType;
      this.otherId = data.otherId;
      this.referenceId = data.referenceId;
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
}
