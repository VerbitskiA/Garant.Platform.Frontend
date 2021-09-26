import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "../core/core-urls/api-url";
import { MainHeader } from "../models/header/main-header";

/**
 * Сервис общих функций.
 */
@Injectable()
export class CommonDataService {
    constructor(private http: HttpClient, private router: Router) {

    }

    /**
     * Функция получит поля хидера.
     * @param type - тип хидера.
     */
    public async initHeaderAsync(type: string) {
        let mainPage = new MainHeader();
        mainPage.Type = type;

        try {
            await this.http.post(API_URL.apiUrl.concat("/user/init-header"), mainPage)
                .subscribe({
                    next: (response: any) => {
                        console.log("Данные хидера:", response);
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

    public routeToStart(err: any) {
        if (err.status === 401) {
            sessionStorage.clear();
            sessionStorage["role"] = "G";

            this.router.navigate(["/login"]);
        }
    };
};