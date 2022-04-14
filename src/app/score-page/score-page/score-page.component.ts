import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss'],
})
export class ScorePageComponent implements OnInit {
  score!: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let dataCorrect = localStorage.getItem('correctData');
    console.log(dataCorrect);
    let dataIncorrect = localStorage.getItem('incorrectData');
    console.log(dataIncorrect);
    let timeToAnswer = JSON.parse(localStorage.getItem('countdown') || '');
    console.log(timeToAnswer);

    if (timeToAnswer > 6) {
    }
  }

  playAgain() {
    this.router.navigate([`welcome`]);
  }
}
