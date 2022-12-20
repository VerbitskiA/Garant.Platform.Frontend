import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {API_URL} from "src/app/core/core-urls/api-url";
import {FilterInput} from "src/app/models/franchise/input/filter-franchise-input";
import {SearchInput} from "src/app/models/search/input/search-input";
import {CommonDataService} from "src/app/core/services/common/common-data.service";
import {CatalogFranchiseModel} from "../../../models";

@Component({
  selector: "app-main-search",
  templateUrl: "./main-search.component.html",
  styleUrls: ["./main-search.component.scss"]
})

/**
 * Класс модуля поиска.
 */
export class MainSearchComponent implements OnInit {
  searchType: string;
  searchText: string;
  aFranchises: any = [];
  aBusinesses: any = [];
  countTotalPage: number = 0;
  filterMinPrice: number = 0;
  filterMaxPrice: number = 0;
  selectedSort: any;
  isGarant: boolean = false;
  aSortPrices: any[] = [];
  isFranchise: boolean = false;
  isBusiness: boolean = false;
  aBusinessList: any = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedCity: string = "";
  aCities: any[] = [];
  selectedCategory: string = "";
  selectedViewBusiness: string = "";
  aBusinessCategories: any = [];
  aBlogs: any[] = [];
  aNews: any[] = [];
  categoryList1: any[] = [];
  categoryList2: any[] = [];
  categoryList3: any[] = [];
  categoryList4: any[] = [];
  aDataActions: any[] = [];
  oTopAction: any = {};
  oSuggestion: any = {};
  aNewFranchises: any[] = [];
  responsiveOptions: any[] = [];
  aReviewsFranchises: any[] = [];
  aResultSearch: any = [];
  rangeValues: number[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private titleService: Title,
              private commonService: CommonDataService) {
    this.searchType = this.route.snapshot.queryParams["searchType"];
    this.searchText = this.route.snapshot.queryParams["searchText"];

    if (this.searchType == "franchise") {
      this.titleService.setTitle("Gobizy: Страница поиска по франшизам");
      this.isFranchise = true;
    }

    if (this.searchType == "business") {
      this.titleService.setTitle("Gobizy: Страница поиска по бизнесу");
      this.isBusiness = true;
    }

    this.aSortPrices = [
      {name: "По убыванию цены", value: "Desc"},
      {name: "По возрастанию цены", value: "Asc"}
    ];

    this.rangeValues = [0, 10000000];

    router.events.subscribe(async (val) => {
      if (val instanceof NavigationEnd) {
        this.searchText = this.route.snapshot.queryParams["searchText"];
        this.searchType = this.route.snapshot.queryParams["searchType"];
        this.searchAsync(this.searchText, this.searchType);
      }
    });
  };

  public ngOnInit() {
    this.GetFranchisesListAsync();
    this.loadCategoriesListAsync();
    this.loadSingleSuggestionAsync();
  };

  /**
   * Функция найдет по параметрам данные.
   * @param searchText Текст поиска.
   */
  private searchAsync(searchText: string, searchType: string) {
    let searchInput = new SearchInput();
    searchInput.SearchType = searchType;
    searchInput.SearchText = searchText;

    this.http.post(API_URL.apiUrl.concat("/search/search-data"), searchInput)
      .subscribe((response: any) => {
        this.aResultSearch = response;

        if (this.searchType == "franchise") {
          // Возьмет 1 изображение.
          this.aFranchises.forEach((item: any) => {
            if (item.url != null && item.url.includes(",")) {
              item.url = item.url.split(",")[0];
            }
          });
        }

        if (this.searchType == "business") {
          // Возьмет 1 изображение.
          this.aBusinesses.forEach((item: any) => {
            if (item.url != null && item.url.includes(",")) {
              item.url = item.url.split(",")[0];
            }
          });
        }

        console.log("search data: ", response);

        // this.router.navigate(["/search"], {
        //     queryParams:
        //     {
        //         searchType: searchType,
        //         searchText: searchText
        //     }
        // });
      }, (err) => {
        throw new Error(err);
      });
  };

  public FilterFranchisesAsync() {
    let filterInput = new FilterInput();
    filterInput.TypeSortPrice = this.selectedSort.value;
    filterInput.ProfitMinPrice = this.filterMinPrice;
    filterInput.ProfitMaxPrice = this.filterMaxPrice;

    this.http.post<CatalogFranchiseModel[]>(API_URL.apiUrl.concat("/franchise/filter-franchises"), filterInput)
      .subscribe((response: any) => {
        console.log("Франшизы после фильтрации:", response);
        // this.aFranchises = response;
      }, (err) => {
        this.commonService.routeToStart(err);
        throw new Error(err);
      });
  };

  public onClearFilters() {
    this.GetFranchisesListAsync();
  };

  /**
   * Функция получит список франшиз.
   */
  private GetFranchisesListAsync() {
    this.http.post<CatalogFranchiseModel[]>(API_URL.apiUrl.concat("/franchise/catalog-franchise"), {})
      .subscribe((response: any) => {
        this.aFranchises = response;
        this.countTotalPage = response.length;
        console.log("Список франшиз:", response);
        console.log("Кол-во франшиз:", this.countTotalPage);
      }, (err) => {
        throw new Error(err);
      });
  };

  public onChangeSortPrice() {
    console.log("onChangeSortPrice", this.selectedSort);
  };

  public sortByRange() {
    this.filterMinPrice = this.rangeValues[0];
    this.filterMaxPrice = this.rangeValues[1];
    console.log(this.rangeValues);
  };

  /**
   * Функция перейдет к просмотру карточки франшизы.
   */
  public routeViewFranchiseCardAsync(franchiseId: number) {
    this.setTransitionAsync(franchiseId);
    this.router.navigate(["/franchise/view"], {queryParams: {franchiseId: franchiseId, mode: "ViewFranchise"}});
  };

  public routeViewBusinessCardAsync(businessId: number) {
    this.setTransitionAsync(businessId);
    this.router.navigate(["/business/view"], {queryParams: {businessId: businessId, mode: "ViewBusiness"}});
  };

  /**
   * Функция запишет переход.
   */
  private setTransitionAsync(franchiseId: number) {
    this.commonService.setTransitionAsync(franchiseId, "Franchise", "", "").subscribe((data: any) => console.log("Переход записан:", data));
  };

  public onRouteFranchiseChatAsync(franchiseId: number, type: string, userId: string) {
    this.commonService.setTransitionAsync(franchiseId, type, userId, type).subscribe((data: any) => {
      console.log("Переход записан:", data);
      // this.router.navigate(["/profile/chat/dialogs/dialog"], { queryParams: { dialogId: dialogId } });
      this.router.navigate(["/profile/chat/dialogs/dialog"]);
    });

  };

  /**
   * Функция получит список категорий.
   * @returns Список категорий.
   */
  private loadCategoriesListAsync() {
    this.commonService.loadCategoriesListAsync().subscribe((data: any) => {
      this.categoryList1 = data.resultCol1;
      this.categoryList2 = data.resultCol2;
      this.categoryList3 = data.resultCol3;
      this.categoryList4 = data.resultCol4;
    });
  };

  /**
   * Функция получит одно предложение с флагом IsSingle.
   * @returns данные предложения.
   */
  private loadSingleSuggestionAsync() {
    this.commonService.loadSingleSuggestionAsync().subscribe((data: any) => this.oSuggestion = data);
  };
}
