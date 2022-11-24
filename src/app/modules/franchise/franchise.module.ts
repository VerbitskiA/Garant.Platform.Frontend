import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewFranchiseComponent} from "./view-franchise/view-franchise.component";
import {EditFranchiseComponent} from "./edit-franchise/edit-franchise.component";
import {CatalogFranchiseComponent} from "./catalog-franchise/catalog-franchise.component";
import {CreateFranchiseComponent} from "./create-franchise/create-franchise.component";
import {ToastModule} from "primeng/toast";
import {RouterLink} from "@angular/router";
import {GalleriaModule} from "primeng/galleria";
import {PipesModule} from "../../core/pipes/pipes.module";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {GarLibModule} from "../../gar-lib/gar-lib.module";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {NewsModule} from "../news/news.module";
import {PromoModule} from "../promo/promo.module";
import {PaginatorModule} from "primeng/paginator";
import {ProductsModule} from "../products/products.module";
import {InputSwitchModule} from "primeng/inputswitch";

const components = [
  ViewFranchiseComponent,
  EditFranchiseComponent,
  CatalogFranchiseComponent,
  CreateFranchiseComponent
];

@NgModule({
  declarations: [...components],
    imports: [
        CommonModule,
        ToastModule,
        RouterLink,
        GalleriaModule,
        PipesModule,
        FormsModule,
        CheckboxModule,
        GarLibModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule,
        NewsModule,
        PromoModule,
        PaginatorModule,
        ProductsModule,
        InputSwitchModule
    ],
  exports: [...components]
})
export class FranchiseModule { }
