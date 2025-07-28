import { Component, Input } from '@angular/core';

@Component({
  selector: 'ds-componenttestcomponent456',
  templateUrl: './componenttestcomponent456.component.html',
  styleUrls: ['./componenttestcomponent456.component.scss']
})
export class Componenttestcomponent456Component {
  @Input() variant: '' = 'default';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  
  // Component properties extracted from Figma
  readonly componentData = {
    name: 'Componenttestcomponent456',
    type: 'COMPONENT',
    variants: [],
    properties: {
  "fills": [
    {
      "type": "SOLID",
      "color": {
        "r": 0.2,
        "g": 0.6,
        "b": 1,
        "a": 1
      }
    }
  ],
  "strokes": [],
  "effects": [],
  "cornerRadius": 8
}
  };
}