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
  timeToAnswer: any;
  dataCorrect!: any;
  dataIncorrect!: any;
  errorMessage = '';

  constructor(private router: Router, public store: StoreService) {
    this.isTimeUp = false;
    this.timeToAnswer = 12;
  }

  ngOnInit(): any {
    this.dataCorrect = localStorage.getItem('correctData');
    console.log(this.dataCorrect);
    this.dataIncorrect = localStorage.getItem('incorrectData');
    console.log(this.dataIncorrect);
    this.timeToAnswer = localStorage.getItem('countdown');
    console.log(this.timeToAnswer);

    this.score =
      (this.dataCorrect - this.dataIncorrect) * this.timeToAnswer * 100;

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
