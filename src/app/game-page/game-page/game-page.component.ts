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
  correctImages: string[] = [];
  incorrectImages: string[] = [];
  counter: number = 12;

  constructor(
    public selectImage: SelectImageService,
    public store: StoreService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

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
          });
        // localStorage.setItem('themeInput1', this.theme1);
        // localStorage.setItem('themeInput2', this.theme2);
        // localStorage.getItem('themeInput1');
        // console.log('cuantos1', localStorage.getItem('themeInput1'));
        // localStorage.getItem('themeInput2');
        // console.log('cuantos2', localStorage.getItem('themeInput2'));
        console.log(this.imageList.slice(0, 16));
        return this.imageList.slice(0, 16);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });

    let interval = setInterval(() => {
      this.counter = this.counter - 1;
      console.log(this.counter);
      if (this.counter === 0) {
        clearInterval(interval);
        // this.router.navigate([`score`]);
      }
    }, 1000);
  }

  selectImages(ev: any) {
    let retrievedInput = ev.target.alt;
    console.log(retrievedInput);
    if (retrievedInput === this.themeToShow) {
      this.correctImages.push(retrievedInput);

      localStorage.setItem(
        'correctData',
        JSON.stringify(this.correctImages.length)
      );
    } else if (retrievedInput !== this.themeToShow) {
      this.incorrectImages.push(retrievedInput);

      localStorage.setItem(
        'incorrectData',
        JSON.stringify(this.incorrectImages.length)
      );
      localStorage.getItem('incorrectData');
      console.log('por que hay algo?', localStorage.getItem('incorrectData'));
    }
  }

  submit() {
    localStorage.setItem('countdown', JSON.stringify(this.counter));

    this.router.navigate([`score`]);
  }
}
