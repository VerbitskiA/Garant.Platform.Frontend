import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Products} from "../../../modules/products/products";
import {API_URL} from "../../core-urls/api-url";
import {map, shareReplay, tap} from "rxjs/operators";
import {Promo} from "../../../modules/promo/promo";

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(
    private _http: HttpClient,
    // private HttpClientService: HttpClientService
  ) {
  }

  private readonly allActions$ = this.getActions().pipe(
    shareReplay(1)
  )

  readonly actions$ = this.allActions$.pipe(
    map(items => items.filter(item => !item.isTop))
  )

  readonly actionsTop$ = this.allActions$.pipe(
    map(items => items.filter(item => item.isTop)[0]),
    tap(res => console.log("oTopAction", res))
  )

  /**
   * Метод получения данных по недавно приобретенным продуктам
   *
   * @remarks ранее именовался "Функция получит данные слайдера"
   * */
  getRecentlyPurchasedProducts(): Observable<Products.Catalog.IRecentlyPurchasedProduct[]> {
    return this._http.post<Products.Catalog.IRecentlyPurchasedProduct[]>(API_URL.apiUrl.concat("/main/slider-last-buy"), {}).pipe(
      tap(response => console.log("Слайдер:", response))
    );
  }

  /**
   * Метод получения данных для блока событий.
   * */
  getActions(): Observable<Promo.IAction[]> {
    return this._http.post<Promo.IAction[]>(API_URL.apiUrl.concat("/main/actions"), {}).pipe(
      tap(response => console.log("Блок событий:", response))
    );
  }
}
