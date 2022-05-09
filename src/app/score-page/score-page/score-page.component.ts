import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss'],
})
export class ScorePageComponent implements OnInit {
  score!: number;
  isTimeUp: boolean;
  timeToAnswer!: number;
  dataCorrect!: number;
  dataIncorrect!: number;
  errorMessage = '';

  constructor(private router: Router, public store: StoreService) {
    this.isTimeUp = false;
  }

  ngOnInit(): any {
    this.dataCorrect = Number(localStorage.getItem('correctData'));
    this.dataIncorrect = Number(localStorage.getItem('incorrectData'));
    this.timeToAnswer = Number(localStorage.getItem('countdown'));

    this.score =
      (this.dataCorrect - this.dataIncorrect) * +this.timeToAnswer * 100;

    if (this.score < 0) {
      this.score = 0;
    }
  }

  playAgain() {
    localStorage.removeItem('savedThemes');
    localStorage.removeItem('correctData');
    localStorage.removeItem('incorrectData');
    localStorage.removeItem('countdown');
    this.router.navigate([`welcome`]);
  }
}
