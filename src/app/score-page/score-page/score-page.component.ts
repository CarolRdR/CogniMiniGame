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

  ngOnInit(): void {
    this.dataCorrect = localStorage.getItem('correctData');
    console.log(this.dataCorrect);
    this.dataIncorrect = localStorage.getItem('incorrectData');
    console.log(this.dataIncorrect);

    this.timeToAnswer = localStorage.getItem('countdown');
    console.log(this.timeToAnswer);

    if (this.timeToAnswer < 1) {
      this.isTimeUp = true;
    } else if (this.timeToAnswer > 6 && !this.dataIncorrect) {
      this.score = this.dataCorrect * 10;
      console.log('score6', this.score);
    } else if (this.timeToAnswer < 6 && !this.dataIncorrect) {
      this.score = this.dataCorrect * 5;

      console.log('score5', this.score);
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
