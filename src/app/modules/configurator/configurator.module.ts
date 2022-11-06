import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfiguratorRoutingModule} from './configurator-routing.module';
import {TableModule} from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {GalleriaModule} from 'primeng/galleria';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ConfiguratorAdminComponent} from './configurator-admin/configurator-admin.component';
import {InputSwitchModule} from "primeng/inputswitch";
import {ConfiguratorAuthComponent} from "./configurator-auth/configurator-auth.component";

const components = [
  ConfiguratorAdminComponent,
  ConfiguratorAuthComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ConfiguratorRoutingModule,
    TableModule,
    InputTextareaModule,
    GalleriaModule,
    ButtonModule,
    TabViewModule,
    ToastModule,
    DialogModule,
    InputSwitchModule
  ],
  exports: [...components]
})

export class ConfiguratorModule {
}
