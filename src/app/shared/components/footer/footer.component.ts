import {Component, HostListener, OnInit} from '@angular/core';
import {CommonDataService} from 'src/app/core/services/common/common-data.service';

export namespace Footer {
  export interface FooterNavItem {
    column: number;
    isPlace: boolean;
    isSignleTitle: boolean;
    name: string;
    position: number;
    title: string;
  }

  export interface FooterSocialItem {
    name: string,
    link: string
  }
}


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

/**
 * Класс модуля футера.
 */
export class FooterComponent implements OnInit {
  public aFooter: any[] = [[], [], [], []];

  public isMobile: boolean = false;

  public socialItems: Footer.FooterSocialItem[] = [
    {name: 'telegram', link: '#'},
    {name: 'facebook', link: '#'},
    {name: 'instagram', link: '#'},
    {name: 'youtube', link: '#'}
  ];

  constructor(private commonService: CommonDataService) {
  }

  public ngOnInit(): void {
    this.initFooter();
    this.isMobile = window.innerWidth < 768;
  }

  @HostListener('window:load', ['$event'])
  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  /**
   * Функция распределит роуты по пунктам футера.
   * @param name - параметр роута с названием пункта.
   */
  public onGetMenuFooter(name: string) {
    // switch (name) {
    //     case "Вход или регистрация":
    //         this.router.navigate(["/login"], { queryParams: { loginType: "code" } });
    //         break;
    // }
  }

  /**
   * Функция получит поля футера.
   */
  private initFooter() {
    this.commonService.initFooterAsync().subscribe((data: any): void => {
      // Распределит пункты футера в каждый стобец.
      data.forEach((item: Footer.FooterNavItem) => {
        if (item.title !== 'gobizy') {
          this.aFooter[item.column - 1].push(item);
        }
      });
    });
  }
}
