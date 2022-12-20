import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { CommonDataService } from "src/app/services/common/common-data.service";

@Component({
    selector: "create-ad",
    templateUrl: "./create-ad.component.html",
    styleUrls: ["./create-ad.component.scss"]
})

/**
 * Класс модуля страницы выбора создания объявления.
 */
export class CreateAdModule implements OnInit {
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

    constructor(private http: HttpClient,
        private commonService: CommonDataService,
        private router: Router) {

    };

    public async ngOnInit() {
        await this.onSelectFracnhiseCheck();
        await this.GetFranchiseCategoriesListAsync();
        await this.getCitiesAsync();
    };

    public onContinue(isSelectFranch: boolean, isSelectBus: boolean, isSelectGobizy: boolean, isSelectSell: boolean) {
        console.log("isSelectFranch", isSelectFranch);
        console.log("isSelectBus", isSelectBus);

        // Если выбрана франшиза.
        if (isSelectFranch) {
            this.router.navigate(["/franchise/create"], { queryParams: { category: this.selectedCategory.categoryName, subCategory: this.selectedSubCategory.subCategoryName } });
        }

        // Если выбран бизнес.
        if (isSelectBus) {
            this.router.navigate(["/business/create"], { queryParams: { category: this.selectedCategory.categoryName, subCategory: this.selectedSubCategory.subCategoryName, city: this.selectedCityName.businessCityName } });
        }
    };

    private async GetFranchiseCategoriesListAsync() {
        try {
            await this.commonService.GetFranchiseCategoriesListAsync().then((data: any) => {
                console.log("Список категорий франшиз:", data);
                this.aFranchiseCategories = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    // private async GetBusinessCategoriesListAsync() {
    //     try {
    //         await this.commonService.GetFranchiseCategoriesListAsync().then((data: any) => {
    //             console.log("Список категорий бизнеса:", data);
    //             this.aBusinessCategories = data;
    //         });
    //     }

    //     catch (e: any) {
    //         throw new Error(e);
    //     }
    // };

    public async onSelectFracnhiseCheck() {
        if (this.isSelectFranch) {
            try {
                await this.commonService.GetFranchiseCategoriesListAsync().then((data: any) => {
                    console.log("Список категорий франшиз:", data);
                    this.aFranchiseCategories = data;
                    this.isSelectBus = false;
                });
            }

            catch (e: any) {
                throw new Error(e);
            }
        }

        else if (!this.isSelectFranch && this.isSelectBus) {
            this.aFranchiseCategories = [];
            // this.aBusinessCategories = [];
            this.aFranchiseSubCategories = [];
        }
    };

    public async onSelectBusinessCheck() {
        if (this.isSelectBus) {
            try {
                await this.commonService.GetBusinessCategoriesListAsync().then((data: any) => {
                    console.log("Список категорий бизнеса:", data);
                    this.aBusinessCategories = data;
                    this.isSelectFranch = false;
                });

                await this.commonService.GetBusinessSubCategoriesListAsync().then((data: any) => {
                    console.log("Список подкатегорий бизнеса:", data);
                    this.aBusinessSubCategories = data;
                });
            }

            catch (e: any) {
                throw new Error(e);
            }
        }

        else if (!this.isSelectBus && this.isSelectFranch) {
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
    public async onFilterSphereAsync(searchText: string) {
        try {
            await this.http.get(API_URL.apiUrl.concat("/franchise/search-sphere?searchText=" + searchText))
                .subscribe({
                    next: (response: any) => {
                        console.log("Список сфер :", response);
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    private async getCitiesAsync() {
        await this.commonService.GetBusinessCitiesListAsync().then((data: any) => {
            console.log("Список городов бизнеса:", data);
            this.aCities = data;
        });
    };

    public async onFilterCategoryAsync(searchText: string, categoryCode: string, categorySysName: string) {
        try {
            await this.http.get(API_URL.apiUrl.concat("/franchise/search-category?searchText="
            + searchText
            + "&categoryCode=" + categoryCode
            + "&categorySysName=" + categorySysName))
                .subscribe({
                    next: (response: any) => {
                        console.log("Список категорий сферы :", response);
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public async onChangeValueSphereAsync(categoryCode: string, categorySysName: string) {
        await this.commonService.GetFranchiseSubCategoriesListAsync(categoryCode, categorySysName).then((data: any) => {
            console.log("Список подкатегорий сферы:", data);
            this.aFranchiseSubCategories = data;
        });
    };

    public async onSelectCheck() {
        console.log("selectedValue", this.selectedValue);

        if (this.selectedValue == "Franchise") {
            this.isSelectFranch = true;
            this.isSelectBus = false;
            await this.onSelectFracnhiseCheck();
        }

        if (this.selectedValue == "Business") {
            this.isSelectFranch = false;
            this.isSelectBus = true;
            await this.onSelectBusinessCheck();
        }
    };
}
