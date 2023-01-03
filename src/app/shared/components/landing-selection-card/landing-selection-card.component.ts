import {Component, Input} from '@angular/core';
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
  styleUrls: ['./landing-selection-card.component.scss']
})
export class LandingSelectionCardComponent  {
  @Input() public allSelectedCardData:SelectedItem[] | undefined;
  constructor() { }


}
