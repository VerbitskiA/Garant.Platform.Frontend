import {Inject, Injectable} from '@angular/core';
import {Window, WindowProvider} from "./window/window.provider";
import {WINDOW} from "./window/window.token";
import {fromEvent} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  public get innerHeight(): number {
    return this._innerHeight;
  }

  public get innerWidth(): number {
    return this._innerWidth;
  }

  public get gradeState(): Window.GradeState {
    return this._gradeState;
  }

  private gradeStates: Window.GradeStatesModel;
  private _gradeState = Window.GradeState.DESKTOP;
  private _innerHeight = 0;
  private _innerWidth = 0;

  constructor(@Inject(WINDOW) private _window: WindowProvider) {
    this.gradeStates = this._window.application.grades || Window.DEFAULT_GRADES;
    this.setWindowSize();
    this.setWindowState(this._innerWidth);
    fromEvent(this._window.application, 'resize').subscribe((data) => {
      this.setWindowSize();
      this.setWindowState(this._innerWidth);
    });
  }

  private setWindowSize(): void {
    this._innerHeight = this._window.application.innerHeight;
    this._innerWidth = this._window.application.innerWidth;
  }

  private setWindowState(innerWidth: number): void {
    if (innerWidth >= this.gradeStates.desktop) {
      this._gradeState = Window.GradeState.DESKTOP;
    } else if (innerWidth < this.gradeStates.desktop && innerWidth >= this.gradeStates.tablet) {
      this._gradeState = Window.GradeState.TABLET;
    } else if (innerWidth < this.gradeStates.tablet && innerWidth >= this.gradeStates.tabletSmall) {
      this._gradeState = Window.GradeState.TABLET_SMALL;
    } else if (innerWidth < this.gradeStates.tabletSmall) {
      this._gradeState = Window.GradeState.PHONE;
    } else {
      this._gradeState = Window.GradeState.DESKTOP;
    }
  }
}
