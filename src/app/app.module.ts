import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageModule } from './game-page/game-page.module';
import { ScorePageModule } from './score-page/score-page.module';
import { WelcomePageModule } from './welcome-page/welcome-page.module';
import { SelectImageService } from './services/select-image.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WelcomePageModule,
    GamePageModule,
    ScorePageModule,
  ],
  providers: [SelectImageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
