import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LanguageService} from "../../../core/services/language/language.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public get miscString(): any {
    return this.languageService.activeDictionary.miscString;
  }
  public get loginOrRegStrings(): any {
    return this.languageService.activeDictionary.loginOrRegister;
  }

  constructor(private languageService: LanguageService,) {
  }

  ngOnInit(): void {
  }

}
