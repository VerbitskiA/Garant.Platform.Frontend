import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NewsService} from "../../../core/services/news/news.service";
import {GarDestroyService} from "../../../gar-lib/gar-destroy.service";
import {shareReplay, takeUntil} from "rxjs/operators";
import {LanguageService} from "../../../core/services/language/language.service";

@Component({
  selector: 'app-news-block',
  templateUrl: './news.block.component.html',
  styleUrls: ['./news.block.component.scss'],
  providers: [GarDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsBlockComponent implements OnInit {

  news$ = this._service.getBlogNews().pipe(
    shareReplay(1),
    takeUntil(this._destroy$)
  )

  public get newsString(): any {
    return this.languageService.activeDictionary.news;
  }
  @Input('banner') public src: string = '/assets/images/promo-block.png'

  constructor(
    private _service: NewsService,
    private _destroy$: GarDestroyService,
    private languageService: LanguageService
  ) {
  }

  ngOnInit(): void {
  }

}
