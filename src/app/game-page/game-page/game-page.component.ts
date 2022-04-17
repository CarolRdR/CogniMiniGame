import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { SelectImageService } from 'src/app/services/select-image.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-game-page',

  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  @Input() themeToShow!: string | undefined;

  theme1!: string;
  theme2!: string;
  imageList: string[] = [];
  images: string[] = [];
  theme: string = '';
  errorMessage = '';
  isClicked: boolean;
  correctImages: string[] = [];
  incorrectImages: string[] = [];
  counter: any;

  constructor(
    public selectImage: SelectImageService,
    public store: StoreService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.counter = 12;
    this.isClicked = false;
  }

  ngOnInit(): void {
    const themes = JSON.parse(localStorage.getItem('savedThemes') || '{}');
    this.theme1 = themes.theme1;
    this.theme2 = themes.theme2;
    this.themeToShow = this.theme1;

    this.store.getImage().subscribe({
      next: (data: any) => {
        this.imageList = data

          .filter(
            (item: any) =>
              item?.[1] === this.theme1 ||
              item?.[2] === this.theme1 ||
              item?.[1] === this.theme2 ||
              item?.[2] === this.theme2
          )
          .sort(function () {
            return Math.random() - 0.5;
          })
          .slice(0, 16);

        return this.imageList;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });

    let interval = setInterval(() => {
      this.counter = this.counter - 1;
      if (this.counter === 0) {
        clearInterval(interval);
        // this.router.navigate([`score`]);
      }
    }, 1000);
  }

  selectImages(ev: any) {
    let retrievedInput = ev.target.alt;

    if (retrievedInput === this.themeToShow) {
      let correctInput: any = this.correctImages.push(retrievedInput);
      localStorage.setItem('correctData', correctInput);
    } else if (retrievedInput !== this.themeToShow) {
      let incorrectInput: any = this.incorrectImages.push(retrievedInput);

      localStorage.setItem('incorrectData', incorrectInput);
    }
  }

  submit() {
    localStorage.setItem('countdown', this.counter);

    this.router.navigate([`score`]);
  }
}
