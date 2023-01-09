import {Injectable} from '@angular/core';
import {ENG} from "../../../strings/ENG/eng-string";
import {RU} from "../../../strings/RU/ru-strings";
import {BLR} from "../../../strings/BLR/blr-strings";
import {PrimeNGConfig} from "primeng/api";

export enum LangVariant {
  ENG = 'us',
  RUS = 'ru',
  BEL = 'by'
}

export interface LangVariantOptions {
  title: string;
  dictionary: any;
  langCode: LangVariant;
  selected: boolean;
}

export interface LangVariantsModel {
  [key: string]: LangVariantOptions;
}

export const LangVariants: LangVariantsModel = {
  [LangVariant.ENG]: {title: 'English', dictionary: ENG, langCode: LangVariant.ENG, selected: false},
  [LangVariant.RUS]: {title: 'Русский', dictionary: RU, langCode: LangVariant.RUS, selected: false},
  [LangVariant.BEL]: {title: 'Беларуская', dictionary: BLR, langCode: LangVariant.BEL, selected: false},
}

@Injectable({providedIn: 'root'})
export class LanguageService {
  public get activeDictionary(): any {
    return this._activeLangVariant && this._activeLangVariant.dictionary;
  }

  public get activeLangVariant(): LangVariantOptions {
    return this._activeLangVariant;
  }

  public langVariants: LangVariantsModel = LangVariants;
  private _activeLangVariant: LangVariantOptions = this.langVariants[LangVariant.ENG];

  constructor(private primeNGConfig: PrimeNGConfig) {
    this.langVariants = LangVariants;
    this.changeLang(this.langVariants[localStorage.getItem('locale') || LangVariant.ENG], false);
  }

  public changeLang(options: LangVariantOptions, reloadPage = true): void {
    Object.keys(this.langVariants).forEach((item) => this.langVariants[item].selected = false);
    this.langVariants[localStorage.getItem('locale') as string].selected = true;
    localStorage.setItem('locale', options.langCode);
    this._activeLangVariant = this.langVariants[localStorage.getItem('locale') as string];
    this.primeNGConfig.setTranslation(this.activeDictionary.primaNgStrings);
    reloadPage && location.reload();
  }
}
