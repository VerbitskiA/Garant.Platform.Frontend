import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {API_URL} from "src/app/core/core-urls/api-url";
import {DealInput} from "src/app/models/garant/input/deal-input";
import {CommonDataService} from "src/app/core/services/common/common-data.service";
import {DataService} from "src/app/core/services/common/data-service";
import {GarantService} from "src/app/core/services/garant/garant.service";

@Component({
  selector: "app-garant-init",
  templateUrl: "./garant-init.component.html",
  styleUrls: ["./garant-init.component.scss"]
})

/**
 * Класс модуля Гаранта (страница инита 1 этап).
 */
export class GarantInitComponent implements OnInit {
  oInitData: any = {};
  isCheckDeal: boolean = false;

  constructor(private http: HttpClient,
              private commonService: CommonDataService,
              private garantService: GarantService,
              private router: Router,
              private dataService: DataService) {

  };

  public ngOnInit() {
    this.initGarantDataAsync();
    this.checkDealAsync();
  };

  /**
   * Функция получит данные Гаранта на ините.
   * @returns Данные инита страницы.
   */
  private initGarantDataAsync() {
    this.garantService.initGarantDataAsync(1, false, this.oInitData.otherId).subscribe((response: any) => {
      this.oInitData = response;
      console.log("garant init data stage 1: ", this.oInitData);
      this.dataService.otherId = this.oInitData.otherId;
    });
  };

  /**
   * Функция подтвердит продажу в сделке.
   */
  public onAcceptDealAsync() {
    let dataInput = new DealInput();

    if (this.oInitData !== null && this.oInitData !== undefined) {
      dataInput.DealItemId = this.oInitData.itemDealId;
      dataInput.OrderType = this.oInitData.itemDealType;
    }

    this.http.post(API_URL.apiUrl.concat("/garant/accept-deal"), dataInput)
      .subscribe((response: any) => console.log(response), (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  };

  /**
   * Функция перейдет к согласованию этапов сделки (2 этап сделки).
   */
  public onRouteReviewIterationsAsync(itemDealId: number, type: string, userId: string) {
    this.commonService.setTransitionAsync(itemDealId, type, userId, type)
      .subscribe((data: any) => this.router.navigate(["/garant/garant-concord"], {queryParams: {stage: '2'}}));
  };

  /**
   * Функция проверит существование сделки.
   * @returns - Статус проверки.
   */
  private checkDealAsync() {
    let dataInput = new DealInput();
    if (this.oInitData !== null && this.oInitData !== undefined) {
      dataInput.DealItemId = this.oInitData.itemDealId;
      dataInput.OrderType = this.oInitData.itemDealType;
    }
    this.http.post(API_URL.apiUrl.concat("/garant/check-deal"), dataInput)
      .subscribe((response: any) => this.isCheckDeal = response, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  };
}
