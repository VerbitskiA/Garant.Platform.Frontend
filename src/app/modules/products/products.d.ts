import {Observable} from "rxjs";

export namespace Products {
  export namespace Catalog {
    export interface IShortCard<T> {
      readonly product$: Observable<T> | undefined;
      path: string | undefined;
    }

    export interface IRecentlyPurchasedProduct {
      countDays: number;
      dateBuy: string;
      dayDeclination: string;
      name: string;
      price: string;
      text: string;
      textDoPrice: string;
      url: string;
    }
  }

  export namespace filter {
    export interface ITag {
      selected: boolean;
      tag: string;
    }
  }
}
