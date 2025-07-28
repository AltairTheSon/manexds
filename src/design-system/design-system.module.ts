import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import existing design system components
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';

const COMPONENTS = [
  ButtonComponent,
  CardComponent,
  InputComponent
];

const DIRECTIVES: any[] = [];

const PIPES: any[] = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class DesignSystemModule { } 