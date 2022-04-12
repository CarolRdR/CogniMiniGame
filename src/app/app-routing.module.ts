import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './game-page/game-page/game-page.component';
import { ScorePageComponent } from './score-page/score-page/score-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent, pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'game',
    component: GamePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'score',
    component: ScorePageComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
