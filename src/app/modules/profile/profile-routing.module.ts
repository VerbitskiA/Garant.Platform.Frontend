import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from "./profile.page/profile.page.component";
import {ProfileMyDataComponent} from "./profile-my-data/profile-my-data.component";
import {NotificationsComponent} from "./profile-requests/notifications.component";
import {ProfileDialogMessagesComponent} from "./profile-dialog-messages/profile-dialog-messages.component";
import {ProfileMyMessagesComponent} from "./profile-my-dialogs/profile-my-dialogs.component";

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    children: [
      {
        path: 'my-data',
        component: ProfileMyDataComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'chat/dialogs/dialog',
        component: ProfileDialogMessagesComponent,
        pathMatch: 'full'
      },
      {
        path: 'chat/dialogs',
        component: ProfileMyMessagesComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
