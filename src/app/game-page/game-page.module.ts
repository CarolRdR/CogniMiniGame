import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page/game-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GamePageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class GamePageModule {}
