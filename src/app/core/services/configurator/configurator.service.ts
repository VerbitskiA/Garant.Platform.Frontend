import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {API_URL} from 'src/app/core/core-urls/api-url';
import {CreateCategoryInput} from 'src/app/models/configurator/input/create-category-input';
import {CreateSphereInput} from 'src/app/models/configurator/input/create-sphere-input';
import {NewBusinessModel} from "../../../models/business/new-business.model";
import {CreateSphereModel} from "../../../models/configurator/create-sphere.model";
import {CreateCategoryModel} from "../../../models/configurator/create-category.model";

@Injectable()
export class ConfiguratorService {
  public readonly notAcceptedBusinesses$ = new BehaviorSubject<any>(undefined);
  public readonly createdSphere$ = new BehaviorSubject<any>(undefined);

  constructor(private readonly http: HttpClient) {
  }

  public onRejectCardAsync(cardId: number, cardType: string, comment: string): Observable<any> {
    return this.http.get(`${API_URL.apiUrl}/configurator/reject-card?cardId=${cardId}&cardType=${cardType}&comment=${comment}`)
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  public getNotAcceptedBusinesses(): Observable<any> {
    console.log("getNotAcceptedBusinesses");
    return this.http.post<NewBusinessModel>(API_URL.apiUrl + '/configurator/businesses-not-accepted', {}).pipe(
      tap(data => this.notAcceptedBusinesses$.next(data))
    );
  };

  /**
   * Функция создаст сферу.
   * @param sphereName
   * @param sphereType
   * @param sysName
   * @returns
   */
  public createSphereAsync(sphereName: string, sphereType: string, sysName: string): Observable<any> {
    let modelInput = new CreateSphereInput();
    modelInput.SphereName = sphereName;
    modelInput.SphereType = sphereType;
    modelInput.SysName = sysName;

    return this.http.post<CreateSphereModel>(API_URL.apiUrl + "/configurator/create-sphere", modelInput)
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };

  /**
   * Функция создаст категорию.
   * @param categoryCode
   * @param sphereName
   * @param sphereType
   * @param sysName
   * @returns
   */
  public createCategoryAsync<CreateCategoryModel>(categoryCode: string, sphereName: string, sphereType: string, sysName: string): Observable<any> {
    let modelInput = new CreateCategoryInput();
    modelInput.CategoryName = sphereName;
    modelInput.CategoryType = sphereType;
    modelInput.SysName = sysName;
    modelInput.SphereCode = categoryCode;
    return this.http.post(API_URL.apiUrl + "/configurator/create-category", modelInput)
      .pipe(tap((response) => response), catchError(err => of(new Error(err))));
  };
}
