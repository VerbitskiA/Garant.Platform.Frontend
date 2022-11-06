import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {API_URL} from "../../core-urls/api-url";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";

/**
 * Сервис документов.
 */
@Injectable()
export class DocumentService {
    constructor(private http: HttpClient) {
    }

     /**
     * Функция скачает файл.
     * @param fileName - Имя файла.
     */
    public downloadFileAsync(fileName: string): Observable<any> {
       return this.http.get(API_URL.apiUrl.concat("/document/download?fileName=" + fileName), { observe: 'response', responseType: 'blob'})
         .pipe(catchError(err => of(new Error(err))));
    };
};
