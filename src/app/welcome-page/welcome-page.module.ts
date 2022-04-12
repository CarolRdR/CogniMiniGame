import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class WelcomePageModule {}
