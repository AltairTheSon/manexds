import { Component, Input } from '@angular/core';

@Component({
  selector: 'ds-steppermobile',
  templateUrl: './steppermobile.component.html',
  styleUrls: ['./steppermobile.component.scss']
})
export class steppermobileComponent {
  @Input() variant: '' = 'default';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  
  // Component properties extracted from Figma
  readonly componentData = {
    name: 'stepper/mobile',
    type: 'COMPONENT_SET',
    variants: [],
    properties: {
  "width": 147,
  "height": 314,
  "fills": [],
  "strokes": [
    {
      "blendMode": "NORMAL",
      "type": "SOLID",
      "color": {
        "r": 0.5921568870544434,
        "g": 0.27843138575553894,
        "b": 1,
        "a": 1
      }
    }
  ],
  "effects": [],
  "cornerRadius": 5
}
  };
}