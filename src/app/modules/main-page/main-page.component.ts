import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonDataService } from 'src/app/services/common/common-data.service';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'src/app/core/core-urls/api-url';
import { ConfirmEmailInput } from 'src/app/models/register/input/confirm-email-input';
import { FranchiseInput } from 'src/app/models/franchise/input/franchise-input';
import { NgForm } from "@angular/forms";
import { CatalogPromoCardComponent } from "../products/catalog/catalog.promo.card/catalog.promo.card.component";
import { shareReplay, takeUntil, tap } from "rxjs/operators";
import { GarDestroyService } from "../../gar-lib/gar-destroy.service";
import {CatalogShortCardComponent} from "../products/catalog/catalog.short.card/catalog.short.card.component";
import { PromoService } from "../promo/promo.service";

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    providers: [GarDestroyService]
})

/**
 * Класс модуля главной страницы.
 */
export class MainPageModule implements OnInit {
	responsiveOptions: any[] = [];
    isGarant: boolean = false;
    // rangeNumber: number = 0;
    rangeValues: number[] = [];
    routeParam: any;
    categoryListBusiness: any[] = [];
    categoryListFranchises: any[] = [];
    oSuggestion: any = {};
    aPopularFranchises: any[] = [];
    aAds: any[] = [];
    aBlogs: any[] = [];
    aFranchises: any[] = [];
    oTopAction: any = {};
    selectedCity: string = "";
    selectedCategory: string = "";
    selectedViewBusiness: string = "";
    cities: any[] = [];
    aCities: any[] = [];
    aBusinessCategories: any[] = [];
    aViewBusiness: any[] = [];
    minPrice: number = 0;
    maxPrice: number = 0;
    view: string = "";
    city: string = "";
    category: string = "";
    aNewBusiness: any[] = [];
    showCategoryMenu: boolean = false;
    
    readonly aDataActions$ = this._promoService.actions$;
    readonly aPopularFranchises$ = this.commonService.getPopularFranchise().pipe(
        shareReplay(1),
        takeUntil(this._destroy$)
    )
    cardShortComponent = CatalogShortCardComponent;
    /**
     * список последних бизнесов
     * */
    readonly aNewBusiness$ = this.commonService.getNewBusiness().pipe(
        shareReplay(1),
        tap(data => console.log("Последний бизнес:", data)),
        takeUntil(this._destroy$)
    )

    constructor(
        private http: HttpClient,
        private _promoService: PromoService,
        private commonService: CommonDataService,
        private titleService: Title,
        private route: ActivatedRoute,
        private router: Router,
        private _destroy$: GarDestroyService
    ) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    };

    public async ngOnInit() {
         // TODO: переделать на получение заголовка с бэка.
         this.titleService.setTitle("Gobizy: Сервис покупки и продажи франшиз");

        this.routeParam = this.route.snapshot.queryParams;
        console.log("routeParam", this.routeParam);

        if (this.routeParam.code !== "" && this.routeParam.code !== undefined && this.routeParam.code !== null) {
            await this.confirmEmailAsync();
        }

        await this.loadCategoriesListAsync();
        await this.loadSingleSuggestionAsync();
        await this.getPopularAsync();
        await this.GetBlogsAsync();
        await this.GetQuickFranchisesAsync();
        await this.loadCitiesFranchisesListAsync();
        await this.loadCategoriesFranchisesListAsync();
        await this.loadViewBusinessFranchisesListAsync();
    };

    public showCategoryOnMobile(e: any) {
      e.target.closest('.title-franchise').nextElementSibling?.classList.toggle('d-block');
      e.target.closest('.title-franchise').lastElementChild?.classList.toggle('rotated');
    }

    /**
     * Функция проверит подтверждение почты.
     */
    private async confirmEmailAsync() {
        try {
            let confirmInput = new ConfirmEmailInput();
            confirmInput.code = this.routeParam.code;

            await this.http.post(API_URL.apiUrl.concat("/user/confirm-email"), confirmInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Подтверждение почты:", response);

                        if (response) {
                            this.router.navigate(["/"]);
                        }
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

     /**
     * Функция получит список категорий.
     * @returns Список категорий.
     */
    private async loadCategoriesListAsync() {
        try {
            await this.commonService.loadCategoriesListAsync().then((data: any) => {
                // TODO refactor backend structure, request will contain only 2 arrays for bussiness and franchises
                this.categoryListBusiness = [...data.resultCol1];
                this.categoryListFranchises = [...data.resultCol3];
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит одно предложение с флагом IsSingle.
     * @returns данные предложения.
     */
    private async loadSingleSuggestionAsync() {
        try {
            await this.commonService.loadSingleSuggestionAsync().then((data: any) => {
                this.oSuggestion = data;
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит список популярныз франшиз.
     * @returns Список франшиз.
     */
    private async getPopularAsync() {
        try {
            this.commonService.getPopularFranchise().pipe(
                takeUntil(this._destroy$)
            ).subscribe(data => {
                console.log('Популярные франшизы:', data);
                this.aPopularFranchises = data;
            })
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит список блогов.
     * @returns Список блогов.
     */
    private async GetBlogsAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/blog/get-blogs"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список блогов:", response);
                        this.aBlogs = response;
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

    /**
     * Функция получит список франшиз для области быстрого поиска.
     * @returns Список франшиз.
     */
     private async GetQuickFranchisesAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/franchise/quick-franchises"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Франшизы для быстрого поиска:", response);
                        this.aFranchises = response;
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

    /**
     * TODO: Вынести в общий сервис.
     * Функция получит список городов франшиз.
     */
    private async loadCitiesFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/cities-list"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список городов:", response);
                        this.aCities = response;
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

     /**
      * TODO: Вынести в общий сервис.
     * Функция получит список категорий бизнеса.
     */
    private async loadCategoriesFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/business-categories-list"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список категорий бизнеса:", response);
                        this.aBusinessCategories = response;
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

    /**
     * TODO: Вынести в общий сервис.
     * Функция получит список видов бизнеса.
     */
    private async loadViewBusinessFranchisesListAsync() {
        try {
            await this.http.post(API_URL.apiUrl.concat("/main/business-list"), {})
                .subscribe({
                    next: (response: any) => {
                        console.log("Список видов бизнеса:", response);
                        this.aViewBusiness = response;
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

    /**
     * Функция отфильтрует список франшиз по фильтрам.
     * @param viewCode - Код вида бизнеса.
     * @param categoryCode - Код категории бизнеса.
     * @param cityCode - Город бизнеса.
     * @param minPrice - Цена от.
     * @param maxPrice - Цена до.
     */
    public async onFilterFranchisesAsync(form: NgForm) {
        console.log("onFilterFranchisesAsync", form);

        try {
            let filterInput = new FranchiseInput();
            filterInput.viewCode = form.value.view.viewCode;
            filterInput.cityCode = form.value.city.cityCode;
            filterInput.categoryCode = form.value.category.categoryCode;
            filterInput.minPrice = form.value.minPrice;
            filterInput.maxPrice = form.value.maxPrice;

            await this.http.post(API_URL.apiUrl.concat("/main/filter"), filterInput)
                .subscribe({
                    next: (response: any) => {
                        console.log("Отфильтрованный список франшиз:", response);
                        this.aFranchises = response;
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

    public onRoute(text: string) {
        if (text == "Продать") {
            this.router.navigate(["/ad/create"]);
            return;
        }

        if (text == "Начать") {
            return;
        }

        if (text == "Упаковать") {
            this.router.navigate(["/franchise/start"]);
            return;
        }
    };
}
