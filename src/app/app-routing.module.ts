import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogFranchiseComponent} from './modules/franchise/catalog-franchise/catalog-franchise.component';
import {EditFranchiseComponent} from './modules/franchise/edit-franchise/edit-franchise.component';
import {CreateFranchiseComponent} from './modules/franchise/create-franchise/create-franchise.component';
import {LoginComponent} from './shared/components/login/login.component';
import {MainPageComponent} from './shared/components/main-page/main-page.component';
import {ProfileDataComponent} from "./modules/profile/profile-data/profile-data.component";
import {ViewFranchiseComponent} from './modules/franchise/view-franchise/view-franchise.component';
import {CreateReadyBusinessComponent} from './modules/business/create-ready-business/create-ready-business.component';
import {ViewReadyBusinessComponent} from './modules/business/view-ready-business/view-ready-business.component';
import {EditReadyBusinessComponent} from './modules/business/edit-ready-business/edit-ready-business.component';
import {ManageAccountComponent} from './modules/profile/manage-account/manage-account.component';
import {MainSearchComponent} from './shared/components/main-search/main-search.component';
import {CatalogBusinessComponent} from './modules/business/catalog-business/catalog-business.component';
import {GarantInitComponent} from './modules/garant/garant-init/garant-init.component';
import {GarantConcordComponent} from './modules/garant/garant-concord/garant-concord.component';
import {GarantContractComponent} from './modules/garant/garant-contract/garant-contract.component';
import {GarantAcceptPaymentComponent} from './modules/garant/garant-accept-payment/garant-accept-payment.component';
import {FranchiseLandingComponent} from './modules/landing/franchise-landing/franchise-landing.component';
import {ConsultingLandingComponent} from './modules/landing/consulting-landing/consulting-landing.component';
import {DealLandingComponent} from './modules/landing/deal-landing/deal-landing.component';
import {ConfiguratorAuthComponent} from './modules/configurator/configurator-auth/configurator-auth.component';
import {CreateAdComponent} from './shared/components/create-ad/create-ad.component';
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent
  },

  {
    path: "login",
    component: LoginComponent
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
    loadChildren: () => import('./modules/configurator/configurator.module').then(m => m.ConfiguratorModule)
  }, {
    path: "demo",
    loadChildren: () => import('./modules/demo/demo.module').then(m => m.DemoModule)
  }, {
    path: "blog",
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
  }, {
    path: "news",
    loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule)
  }, {
    canActivate: [AuthGuard],
    path: "profile",
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
