import { Component, Input } from '@angular/core';

@Component({
  selector: 'ds-buttonstextomegawithlefticon',
  templateUrl: './buttonstextomegawithlefticon.component.html',
  styleUrls: ['./buttonstextomegawithlefticon.component.scss']
})
export class buttonstextomegawithlefticonComponent {
  @Input() variant: '' = 'default';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  
  // Component properties extracted from Figma
  readonly componentData = {
    name: 'buttons/text/omega-with-left-icon',
    type: 'COMPONENT',
    variants: [],
    properties: {
  "width": 56,
  "height": 18,
  "fills": [],
  "strokes": [],
  "effects": []
}
  };
}