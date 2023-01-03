import {Component, Input, ViewEncapsulation} from '@angular/core';

export interface SelectedItem {
  title: string;
  subtitle: string;
  item_text: string;
  button: string;
  image: string;
  alt: string;
}
@Component({
  selector: 'app-landing-selection-card',
  templateUrl: './landing-selection-card.component.html',
  styleUrls: ['./landing-selection-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingSelectionCardComponent  {
  @Input() public allSelectedCardData:SelectedItem[] | undefined;
  constructor() { }


}
