import { Component } from '@angular/core';

@Component({
  selector: 'app-screenshots',
  templateUrl: './screenshots.component.html',
  styleUrls: ['./screenshots.component.scss']
})
export class ScreenshotsComponent {
  // Page properties extracted from Figma
  readonly pageData = {
    name: 'Screenshots ',
    children: []
  };
}