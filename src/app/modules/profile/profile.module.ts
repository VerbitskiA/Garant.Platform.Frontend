import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfilePageComponent} from "./profile.page/profile.page.component";
import {ProfileDataComponent} from "./profile-data/profile-data.component";
import {ProfileMyDataComponent} from "./profile-my-data/profile-my-data.component";
import {NotificationsComponent} from "./profile-requests/notifications.component";
import {ProfileDialogMessagesComponent} from "./profile-dialog-messages/profile-dialog-messages.component";
import {ProfileMyMessagesComponent} from "./profile-my-dialogs/profile-my-dialogs.component";
import {ManageAccountComponent} from "./manage-account/manage-account.component";
import {FormsModule} from "@angular/forms";
import {GarLibModule} from "../../gar-lib/gar-lib.module";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToastModule} from "primeng/toast";

const components = [
  ProfilePageComponent,
  ProfileDataComponent,
  ProfileMyDataComponent,
  NotificationsComponent,
  ProfileDialogMessagesComponent,
  ProfileMyMessagesComponent,
  ManageAccountComponent
]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    GarLibModule,
    InputTextareaModule,
    ToastModule
  ],
  exports: [...components]
})
export class ProfileModule { }
