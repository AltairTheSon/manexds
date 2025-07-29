import { Component, Input } from '@angular/core';

@Component({
  selector: 'ds-tooltipsarrowupheadsupnoicon',
  templateUrl: './tooltipsarrowupheadsupnoicon.component.html',
  styleUrls: ['./tooltipsarrowupheadsupnoicon.component.scss']
})
export class tooltipsarrowupheadsupnoiconComponent {
  @Input() variant: '' = 'default';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  
  // Component properties extracted from Figma
  readonly componentData = {
    name: 'tooltips/arrow-up/heads-up-no-icon',
    type: 'COMPONENT',
    variants: [],
    properties: {
  "width": 84,
  "height": 55,
  "fills": [],
  "strokes": [],
  "effects": []
}
  };
}