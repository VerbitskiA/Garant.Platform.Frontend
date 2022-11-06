import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {API_URL} from "src/app/core/core-urls/api-url";
import {CommonDataService} from "src/app/core/services/common/common-data.service";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: "app-create-ad",
  templateUrl: "./create-ad.component.html",
  styleUrls: ["./create-ad.component.scss"]
})

/**
 * Класс модуля страницы выбора создания объявления.
 */
export class CreateAdComponent implements OnInit {
  aFranchiseCategories: any;
  aBusinessCategories: any;
  aFranchiseSubCategories: any;
  aBusinessSubCategories: any;
  aCities: any;
  selectedCategory: any;
  selectedSubCategory: any;
  isSelectGobizy: boolean = false;
  isSelectSell: boolean = false;
  isSelectFranch: boolean = true;
  isSelectBus: boolean = false;
  selectedCityName: any;
  selectedValue: any = 'Franchise';

  constructor(
    private http: HttpClient,
    private commonService: CommonDataService,
    private router: Router
  ) {
  };

  public ngOnInit() {
     this.onSelectFracnhiseCheck();
     this.GetFranchiseCategoriesListAsync();
     this.getCitiesAsync();
  };

  public onContinue(isSelectFranch: boolean, isSelectBus: boolean, isSelectGobizy: boolean, isSelectSell: boolean) {
    // Если выбрана франшиза.
    if (isSelectFranch) {
      this.router.navigate(["/franchise/create"], {
        queryParams: {
          category: this.selectedCategory.categoryName,
          subCategory: this.selectedSubCategory.subCategoryName
        }
      });
    }

    // Если выбран бизнес.
    if (isSelectBus) {
      this.router.navigate(["/business/create"], {
        queryParams: {
          category: this.selectedCategory.categoryName,
          subCategory: this.selectedSubCategory.subCategoryName,
          city: this.selectedCityName.businessCityName
        }
      });
    }
  };

  private GetFranchiseCategoriesListAsync() {
    this.commonService.GetFranchiseCategoriesListAsync().subscribe((data: any) => this.aFranchiseCategories = data);
  };

  // private async GetBusinessCategoriesListAsync() {
  //     try {
  //          this.commonService.GetFranchiseCategoriesListAsync().then((data: any) => {
  //             console.log("Список категорий бизнеса:", data);
  //             this.aBusinessCategories = data;
  //         });
  //     }

  //     catch (e: any) {
  //         throw new Error(e);
  //     }
  // };

  public onSelectFracnhiseCheck() {
    if (this.isSelectFranch) {
      this.commonService.GetFranchiseCategoriesListAsync().subscribe((data: any) => {
        console.log("Список категорий франшиз:", data);
        this.aFranchiseCategories = data;
        this.isSelectBus = false;
      });
    } else if (!this.isSelectFranch && this.isSelectBus) {
      this.aFranchiseCategories = [];
      // this.aBusinessCategories = [];
      this.aFranchiseSubCategories = [];
    }
  };

  public onSelectBusinessCheck() {
    if (this.isSelectBus) {
      this.commonService.GetBusinessCategoriesListAsync().subscribe((data: any) => {
        console.log("Список категорий бизнеса:", data);
        this.aBusinessCategories = data;
        this.isSelectFranch = false;
      });

      this.commonService.GetBusinessSubCategoriesListAsync().subscribe((data: any) => {
        console.log("Список подкатегорий бизнеса:", data);
        this.aBusinessSubCategories = data;
      });

    } else if (!this.isSelectBus && this.isSelectFranch) {
      this.aFranchiseCategories = [];
      this.aBusinessCategories = [];
      this.aFranchiseSubCategories = [];
    }
  };

  /**
   * Функция фильтрует список сфер в зависимости от поискового запроса.
   * @param searchText - Поисковый запрос.
   * @returns - Список сфер.
   */
  public onFilterSphereAsync(searchText: string) {
    this.http.get(API_URL.apiUrl.concat("/franchise/search-sphere?searchText=" + searchText))
      .pipe(tap((response) => console.log("Список сфер :", response)));
  };

  private getCitiesAsync() {
    this.commonService.GetBusinessCitiesListAsync().subscribe((data: any) => {
      console.log("Список городов бизнеса:", data);
      this.aCities = data;
    });
  };

  public onFilterCategoryAsync(searchText: string, categoryCode: string, categorySysName: string) {
    this.http.get(API_URL.apiUrl.concat("/franchise/search-category?searchText="
      + searchText
      + "&categoryCode=" + categoryCode
      + "&categorySysName=" + categorySysName))
      .pipe(tap((response) => console.log("Список категорий сферы :", response)));
  };

  public onChangeValueSphereAsync(categoryCode: string, categorySysName: string) {
    this.commonService.GetFranchiseSubCategoriesListAsync(categoryCode, categorySysName).subscribe((data: any) => {
      console.log("Список подкатегорий сферы:", data);
      this.aFranchiseSubCategories = data;
    });
  };

  public onSelectCheck() {
    console.log("selectedValue", this.selectedValue);

    if (this.selectedValue == "Franchise") {
      this.isSelectFranch = true;
      this.isSelectBus = false;
      this.onSelectFracnhiseCheck();
    }

    if (this.selectedValue == "Business") {
      this.isSelectFranch = false;
      this.isSelectBus = true;
      this.onSelectBusinessCheck();
    }
  };
}
