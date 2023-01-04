import {Component, HostListener, Input, ViewEncapsulation} from '@angular/core';


export interface SelectedItem {
  title: string;
  subtitle: string;
  item_text: string;
  button: string;
  image: string;
  image_small:string;
  alt: string;
}
@Component({
  selector: 'app-landing-selection-card',
  templateUrl: './landing-selection-card.component.html',
  styleUrls: ['./landing-selection-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingSelectionCardComponent  {
  public getScreenWidth: any;
  public screenMode?: boolean;

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;

    if(this.getScreenWidth<768)
    {
      this.screenMode=true;
    }
    else
    {
      this.screenMode=false;
    }
  }



  @Input() public allSelectedCardData:SelectedItem[] | undefined;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;

  }



}
