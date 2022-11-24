import {Component, OnInit} from '@angular/core';
import {Spinkit} from 'ng-http-loader';
import {MetrikaService} from "./core/services/common/metrika.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isGarant: boolean = false;
  spinnerStyle = Spinkit;

  constructor(
    private _metrika: MetrikaService,
  ) { }

  ngDoCheck() {
    this.isGarant = window.location.href.includes("stage");
  };

  ngOnInit(): void {
    this._metrika.initMetrika();
  }
}
