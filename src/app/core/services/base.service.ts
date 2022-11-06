import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {AuthService} from "../auth.service";
import {ResponsesModel} from "../../models/responses.model";
import DefaultBackendMessageModel = ResponsesModel.DefaultBackendMessageModel;
import {API_URL} from "../core-urls/api-url";

export type ServiceParamsType = HttpParams | {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};

export type ServiceHeadersType = HttpHeaders | {
  [header: string]: string | string[];
};

export interface ServiceOptions<TModel> {
  body: TModel;
  params?: ServiceParamsType;
  headers?: ServiceHeadersType
}

export interface ServiceParams {
  params: ServiceParamsType
}

export interface ServiceHeaders {
  headers: ServiceHeadersType
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientService<TGetSingleModel, TGetListModel, TPostModel, TPutModel, TDeleteModel = string, TMessageModel = DefaultBackendMessageModel> {
  public readonly endpointUrl: string = '';

  protected get baseUrl(): string {
    return `${API_URL.apiUrl}/${this.endpointUrl}`;
  }

  constructor(
    protected httpClient: HttpClient,
    // protected authService: AuthService
  ) {
  }

  public getList(url: string, params?: ServiceParamsType, headers?: ServiceHeadersType): Observable<TGetListModel> {
    return this.request<TGetListModel>('get', null, params, headers, url);
  }

  public getSingle(url: string, params?: ServiceParamsType, headers?: ServiceHeadersType): Observable<TGetSingleModel> {
    return this.request<TGetSingleModel>('get', null, params, headers, url);
  }

  public postWithReturn<TCustomModel = TPostModel, TCustomResponse = TGetSingleModel>(url: string, body?: TCustomModel, params?: ServiceParamsType, headers?: ServiceHeadersType): Observable<TCustomResponse> {
    return this.request<TCustomResponse, TCustomModel>('post', {body, params, headers} as ServiceOptions<TCustomModel>, null, null, url);
  }

  public putWithReturn(url: string, body?: TPutModel, params?: ServiceParamsType, headers?: ServiceHeadersType): Observable<TGetSingleModel> {
    return this.request<TGetSingleModel, TPutModel>('put', {body, ...params, ...headers} as ServiceOptions<TPutModel>, null, null, url);
  }

  public deleteEntity(url: string, params?: ServiceParamsType, headers?: ServiceHeadersType): Observable<TMessageModel> {
    return this.request<TMessageModel>('delete', null, params, headers, url);
  }

  public request<TReturnModel, TServiceOptionsModel = any>(method: string, body?: ServiceOptions<TServiceOptionsModel> | null, params?: ServiceParamsType | null, headers?: ServiceHeadersType | null, apiUri?: string): Observable<TReturnModel> {
    // const tokenValue = this.authService.getToken();
    // if (tokenValue) {
    //   const token = {headers: {Authorization: `Bearer ${this.authService.getToken()}`}};
    //   return this.httpClient.request(method, this.baseUrl + apiUri, {...body, ...token, ...params, ...headers}) as Observable<TReturnModel>;
    // }
    return this.httpClient.request(method, this.baseUrl + apiUri, {...body, ...params, ...headers}) as Observable<TReturnModel>;
  }
}
