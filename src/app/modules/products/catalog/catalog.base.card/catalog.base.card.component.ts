import { Component, Input } from "@angular/core";
import { Products } from "../../products";
import { Observable } from "rxjs";
import { GarItemComponent } from "../../../../gar-lib/gar-item/gar-item.component";

/**
 * Базовый компонент представления карточки каталога
 * */
@Component({
	template: ''
})
export abstract class CatalogBaseCardComponent<T> extends GarItemComponent<T> implements Products.Catalog.IShortCard<T> {

	@Input()
  override set item(value: T) {
		this._product$.next(value);
	}

  /**
   * Маршрут для перехода в карточку просмотра продукта
   */
  @Input()
  pathInfo: string = '/';

  /**
   * Маршрут для перехода на шаг приобретения продукта
   */
  @Input()
  pathBuy: string = '/';

	readonly product$: Observable<T> | undefined = this._product$;

}
