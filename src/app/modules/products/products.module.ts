import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogShortCardComponent } from "./catalog/catalog.short.card/catalog.short.card.component";
import { GarLibModule } from "../../gar-lib/gar-lib.module";
import { RouterModule } from "@angular/router";
import { CatalogPromoCardComponent } from './catalog/catalog.promo.card/catalog.promo.card.component';
import { CatalogSimpleCardComponent } from './catalog/catalog.simple.card/catalog.simple.card.component';
import { ShowcaseComponent } from './ showcase/showcase.component';
import { TagToggleComponent } from "./filter/tag.toggle/tag.toggle.component";
import { FormsModule } from "@angular/forms";
import { CatalogNewsCardComponent } from './catalog/catalog.news.card/catalog.news.card.component';

const _COMPONENTS = [
	CatalogShortCardComponent,
	CatalogPromoCardComponent,
	CatalogSimpleCardComponent,
	CatalogNewsCardComponent,
	ShowcaseComponent,
	TagToggleComponent
]

/**
 * Модуль, публикующий компоненты, относящиеся к представлению каталога
 * */
@NgModule({
	declarations: [
		..._COMPONENTS
	],
	exports: [
		..._COMPONENTS
	],
	imports: [
		CommonModule,
		GarLibModule,
		RouterModule,
		FormsModule
	]
})
export class ProductsModule {
}
