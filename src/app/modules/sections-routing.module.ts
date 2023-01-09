import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogFranchiseComponent} from './franchise/catalog-franchise/catalog-franchise.component';
import {EditFranchiseComponent} from './franchise/edit-franchise/edit-franchise.component';
import {CreateFranchiseComponent} from './franchise/create-franchise/create-franchise.component';
import {ProfileDataComponent} from "./profile/profile-data/profile-data.component";
import {ViewFranchiseComponent} from './franchise/view-franchise/view-franchise.component';
import {CreateReadyBusinessComponent} from './business/create-ready-business/create-ready-business.component';
import {ViewReadyBusinessComponent} from './business/view-ready-business/view-ready-business.component';
import {EditReadyBusinessComponent} from './business/edit-ready-business/edit-ready-business.component';
import {ManageAccountComponent} from './profile/manage-account/manage-account.component';
import {CatalogBusinessComponent} from './business/catalog-business/catalog-business.component';
import {GarantInitComponent} from './garant/garant-init/garant-init.component';
import {GarantConcordComponent} from './garant/garant-concord/garant-concord.component';
import {GarantContractComponent} from './garant/garant-contract/garant-contract.component';
import {GarantAcceptPaymentComponent} from './garant/garant-accept-payment/garant-accept-payment.component';
import {FranchiseLandingComponent} from './landing/franchise-landing/franchise-landing.component';
import {ConsultingLandingComponent} from './landing/consulting-landing/consulting-landing.component';
import {DealLandingComponent} from './landing/deal-landing/deal-landing.component';
import {ConfiguratorAuthComponent} from './configurator/configurator-auth/configurator-auth.component';
import {AuthGuard} from "../core/guards/auth.guard";
import {MainSearchComponent} from "../shared/components/main-search/main-search.component";
import {CreateAdComponent} from "../shared/components/create-ad/create-ad.component";
import {MainPageComponent} from "../shared/components/main-page/main-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: "full"
  },

  {
    path: "main",
    component: MainPageComponent
  },

  {
    // canActivate: [AuthGuard],
    path: "profile-data",
    component: ProfileDataComponent
  },

  {
    path: "catalog-franchise",
    component: CatalogFranchiseComponent
  },

  {
    path: "franchise/create",
    component: CreateFranchiseComponent
  },

  {
    path: "franchise/view",
    component: ViewFranchiseComponent
  },

  {
    path: "franchise/edit",
    component: EditFranchiseComponent
  },

  {
    path: "business/create",
    component: CreateReadyBusinessComponent
  },

  {
    path: "business/view",
    component: ViewReadyBusinessComponent
  },

  {
    path: "business/edit",
    component: EditReadyBusinessComponent
  },

  {
    path: "ad/create",
    component: CreateAdComponent
  },

  {
    path: "manage-account",
    component: ManageAccountComponent
  },

  {
    path: "search",
    component: MainSearchComponent
  },
  {
    path: "catalog-business",
    component: CatalogBusinessComponent
  },

  {
    path: "garant/garant-init",
    component: GarantInitComponent
  },

  {
    path: "garant/garant-concord",
    component: GarantConcordComponent
  },

  {
    path: "garant/garant-contract",
    component: GarantContractComponent
  },

  {
    path: "garant/garant-accept-payment",
    component: GarantAcceptPaymentComponent
  },

  {
    path: "franchise/start",
    component: FranchiseLandingComponent
  },

  {
    path: "consulting/start",
    component: ConsultingLandingComponent
  },

  {
    path: "deal/start",
    component: DealLandingComponent
  },

  {
    path: "configurator/auth",
    component: ConfiguratorAuthComponent
  },

  // {
  //   path: "configurator/admin",
  //   component: ConfiguratorAdminModule
  // }

  {
    canActivate: [AuthGuard],
    path: "configurator/admin",
    loadChildren: () => import('./configurator/configurator.module').then(m => m.ConfiguratorModule)
  }, {
    path: "demo",
    loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
  }, {
    path: "blog",
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
  }, {
    path: "news",
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
  }, {
    canActivate: [AuthGuard],
    path: "profile",
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SectionsRoutingModule { }
