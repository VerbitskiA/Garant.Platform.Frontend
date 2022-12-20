import {Injectable} from "@angular/core";
import {BehaviorSubject, fromEvent, Observable} from "rxjs";
import {map, shareReplay, startWith} from "rxjs/operators";

export namespace Window {
  export enum GradeState {
    DESKTOP = 1,
    TABLET,
    TABLET_SMALL,
    PHONE
  }

  export interface GradeStatesModel {
    desktop: number;
    phone: number;
    tablet: number;
    tabletSmall: number;
  }

  export const DEFAULT_GRADES = {
    desktop: 1440,
    phone: 767,
    tablet: 1024,
    tabletSmall: 768,
  } as GradeStatesModel;

  export interface IApplicationWindow extends Window {
    /** Параметры сетки приложения */
    grades: GradeStatesModel;
  }
}

declare const window: Window;

/**
 * Поставщик Window для приложения с расширенными свойствами
 * */
@Injectable()
export class WindowProvider {

  public readonly application: Window.IApplicationWindow;
  public readonly width$: Observable<number>;
  private readonly _width$: BehaviorSubject<number>;

  constructor() {
    this.application = window as Window.IApplicationWindow;
    this.application.grades = Window.DEFAULT_GRADES;
    this._width$ = new BehaviorSubject<number>(this.application.innerWidth);
    this.width$ = fromEvent(this.application, 'resize').pipe(
      startWith(true),
      map(e => this.application.innerWidth),
      shareReplay({bufferSize: 1, refCount: false})
    );
  }
}
