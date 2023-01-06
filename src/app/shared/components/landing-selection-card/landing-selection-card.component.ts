import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';


export interface SelectedItem {
  title: string;
  subtitle: string;
  item_text: string;
  button: string;
  image: string;
  image_small: string;
  alt: string;
}

@Component({
  selector: 'app-landing-selection-card',
  templateUrl: './landing-selection-card.component.html',
  styleUrls: ['./landing-selection-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingSelectionCardComponent {
  @Input() public allSelectedCardData: SelectedItem[] | undefined;
  public getScreenWidth: any;
  public screenMode?: boolean;

  public ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.screenMode = this.getScreenWidth < 768;
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(): void {
    this.getScreenWidth = window.innerWidth;
  }
}
