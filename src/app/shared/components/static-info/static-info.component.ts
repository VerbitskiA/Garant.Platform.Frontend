import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-static-info',
  templateUrl: './static-info.component.html',
  styleUrls: ['./static-info.component.scss']
})
export class StaticInfoComponent {
  @Input() public title: string | undefined;
  @Input() public data: string | number | Date | undefined;
  @Input() public rowView = false;
  constructor() { }
}
