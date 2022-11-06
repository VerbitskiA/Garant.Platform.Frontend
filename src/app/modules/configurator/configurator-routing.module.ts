import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorAdminComponent } from './configurator-admin/configurator-admin.component';

const routes: Routes = [
    { path: '', component: ConfiguratorAdminComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfiguratorRoutingModule {}
