import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CommonDataService} from "src/app/core/services/common/common-data.service";

@Component({
  selector: "app-profile-my-dialogs",
  templateUrl: "./profile-my-dialogs.component.html",
  styleUrls: ["./profile-my-dialogs.component.scss"]
})

/**
 * Класс модуля профиля пользователя (мои сообщения).
 */
export class ProfileMyMessagesComponent implements OnInit {
  aDialogs: any = [];

  constructor(private router: Router,
              private commonService: CommonDataService) {

  };

  public ngOnInit() {
    this.getDialogsAsync();
  };

  private getDialogsAsync() {
    this.commonService.getDialogsAsync().subscribe((data: any) => this.aDialogs = data);
  };

  /**
   * Функция получит Id диалога, для которого нужно получить сообщения и перейдет на страницу сообщений диалога.
   * @param dialogId Id диалога.
   */
  public onGetDialogMessageAsync(dialogId: any) {
    console.log("Выбранный диалог: ", dialogId);
    this.commonService.setTransitionAsync(dialogId, "Chat", "", "").subscribe((data: any) => {
      console.log("Переход записан:", data)
      this.router.navigate(["/profile/chat/dialogs/dialog"], {queryParams: {dialogId: dialogId}});
    });

  };
}
