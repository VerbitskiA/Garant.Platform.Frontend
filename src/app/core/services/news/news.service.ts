import {Injectable} from '@angular/core';
import {API_URL} from "../../core-urls/api-url";
import {HttpClient} from "@angular/common/http";
import {News} from "../../../modules/news/news";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

const businessWorld: News.IBusinessNewsBlockItem[] = [
  {
    newsId: 13,
    title: "Заголовок новости 1",
    text: "Причина#1 обращения Гейтса к Маску оказалось вполне себе благородной – он хотел обсудить благотворительность в насущных вопросах изменения климата. Судя по скриншотам, Маск поначалу был не против встречи, но потом он спросил у Гейтса о его коротких позициях в Tesla на полмиллиарда долларов. И тот признал, что действительно не закрыл их. На что Маск ответил следующее:   ",
    url: "../../../assets/images/Rectangle 24.png",
    dateCreated: "2022-05-01T18:50:12.436244",
    type: "Партнёрство",
    isPaid: false,
    position: 4,
    viewsCount: 2,
    date: "01 мая",
    time: "18:50",
    theme: 'Инвестиции'
  },
  {
    newsId: 12,
    title: "Заголовок новости 2",
    text: "Причина#2 обращения Гейтса к Маску оказалось вполне себе благородной – он хотел обсудить благотворительность в насущных вопросах изменения климата. Судя по скриншотам, Маск поначалу был не против встречи, но потом он спросил у Гейтса о его коротких позициях в Tesla на полмиллиарда долларов. И тот признал, что действительно не закрыл их. На что Маск ответил следующее:   ",
    url: "../../../assets/images/Rectangle 24.png",
    dateCreated: "2022-04-24T18:55:53.111159",
    type: "Партнёрство",
    isPaid: false,
    position: 3,
    viewsCount: 15,
    date: "24 апреля",
    time: "18:55",
    theme: 'Франчайзинг'
  },
  {
    newsId: 11,
    title: "Заголовок новости про Била Гейтса и Илона Маска 3",
    text: "Причина#3 обращения Гейтса к Маску оказалось вполне себе благородной – он хотел обсудить благотворительность в насущных вопросах изменения климата. Судя по скриншотам, Маск поначалу был не против встречи, но потом он спросил у Гейтса о его коротких позициях в Tesla на полмиллиарда долларов. И тот признал, что действительно не закрыл их. На что Маск ответил следующее:   ",
    url: "../../../assets/images/Rectangle 24.png",
    dateCreated: "2022-04-24T18:49:39.869117",
    type: "Партнёрство",
    isPaid: false,
    position: 2,
    viewsCount: 1,
    date: "24 апреля",
    time: "18:49",
    theme: 'Инвестиции'
  },
  {
    newsId: 9,
    title: "Заголовок новости 4",
    text: "test",
    url: "../../../assets/images/Rectangle 24.png",
    dateCreated: "2022-03-25T16:58:43.76",
    type: "test",
    isPaid: false,
    position: 1,
    viewsCount: 6,
    date: "25 марта",
    time: "16:58",
    theme: 'Политика'
  },
  {
    newsId: 5,
    title: "Заголовок новости 5",
    text: "test55text",
    url: "../../../assets/images/Rectangle 24.png",
    dateCreated: "2022-03-19T16:58:43.76",
    type: "test",
    isPaid: false,
    position: 1,
    viewsCount: 55,
    date: "19 марта",
    time: "16:58",
    theme: 'Инвестиции'
  },
  {
    newsId: 4,
    title: "Заголовок новости 6",
    text: "test",
    url: "../../../assets/images/Rectangle 24.png",
    dateCreated: "2022-02-11T16:58:43.76",
    type: "test",
    isPaid: false,
    position: 1,
    viewsCount: 6,
    date: "11 февраля",
    time: "16:58",
    theme: 'Франчайзинг'
  },
  {
    newsId: 3,
    title: "Заголовок новости 7",
    text: "test",
    url: "../../../assets/images/Rectangle 24.png",
    dateCreated: "2022-02-10T16:58:43.76",
    type: "test",
    isPaid: false,
    position: 1,
    viewsCount: 6,
    date: "11 февраля",
    time: "16:58",
    theme: 'Бизнес'
  },
  {
    newsId: 2,
    title: "Заголовок новости 8",
    text: "test15text",
    url: "../../../assets/images/Rectangle 24.png",
    dateCreated: "2022-01-30T16:58:43.76",
    type: "test",
    isPaid: false,
    position: 1,
    viewsCount: 5,
    date: "11 января",
    time: "16:58",
    theme: 'Бизнес'
  },
  {
    newsId: 1,
    title: "Заголовок новости 9",
    text: "test19text",
    url: "../../../assets/images/Rectangle 24.png",
    dateCreated: "2022-01-11T16:58:43.76",
    type: "test",
    isPaid: false,
    position: 1,
    viewsCount: 19,
    date: "11 января",
    time: "16:58",
    theme: 'Франчайзинг'
  }
];


/**
 * Сервис новостей
 *
 * TODO: перенести из компонентов методы получения данных в сервис
 * */
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
      private _http: HttpClient
  ) { }

  /**
   * Получение новостей для блока новостей
   * */
  getBlogNews(): Observable<News.INewsBlockItem[]> {
    return this._http.post<News.INewsBlockItem[]> (API_URL.apiUrl.concat("/blog/get-news"), {}).pipe(
        tap(response => console.log('Список новостей:', response))
    )
  }

  /**
   * Получение новостей делового мира
   *
   * TODO: нет реализации на бэке
   *
   */
  getBusinessNews(): Observable<News.IBusinessNewsBlockItem[]> {
    return of(businessWorld);
  }

}
