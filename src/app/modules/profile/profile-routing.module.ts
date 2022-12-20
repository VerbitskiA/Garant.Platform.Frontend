import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from "./profile.page/profile.page.component";
import {ProfileMyDataComponent} from "./profile-my-data/profile-my-data.component";
import {NotificationsComponent} from "./profile-requests/notifications.component";
import {ProfileDialogMessagesComponent} from "./profile-dialog-messages/profile-dialog-messages.component";
import {ProfileMyMessagesComponent} from "./profile-my-dialogs/profile-my-dialogs.component";
import {AuthGuard} from "../../core/guards/auth.guard";

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    component: ProfilePageComponent,
    children: [
      {
        canActivate: [AuthGuard],
        path: 'my-data',
        component: ProfileMyDataComponent
      },
      {
        canActivate: [AuthGuard],
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        canActivate: [AuthGuard],
        path: 'chat/dialogs/dialog',
        component: ProfileDialogMessagesComponent,
        pathMatch: 'full'
      },
      {
        canActivate: [AuthGuard],
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
