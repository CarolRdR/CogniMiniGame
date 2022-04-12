import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SearchImagesI } from 'src/app/interfaces';
import { SelectImageService } from 'src/app/services/select-image.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  @Input() themeToShow!: string | undefined;
  imagesForm!: FormGroup;
  imagesInput!: SearchImagesI;
  theme1!: string;
  theme2!: string;
  // themeToShow = this.theme1;
  imageList: string[] = [];
  images: [];
  inputValue!: string;
  theme: string;
  errorMessage = '';
  timeLeft: number = 12;
  interval: any;

  constructor(
    public selectImage: SelectImageService,
    public store: StoreService,
    private fb: FormBuilder,
    public route: ActivatedRoute
  ) {
    this.imageList = [];
    this.images = [];
    this.theme = '';
  }

  ngOnInit(): void {
    this.store.getImage().subscribe({
      next: (data: any) => {
        this.imageList = data.sort(function () {
          return Math.random() - 0.5;
        });
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });

    const themes = JSON.parse(localStorage.getItem('savedThemes') || '{}');
    this.theme1 = themes.theme1;
    this.theme2 = themes.theme2;
    this.themeToShow = this.theme1;
    console.log('primer tema', this.theme1);
    console.log('segundo tema', this.theme2);

    this.imagesForm = this.fb.group({
      images: [''],
    });

    // this.store.getImage().subscribe({
    //   next: (data) => {
    //     this.imagesInput = data;
    //     this.imagesForm.get('images')?.setValue(this.imagesInput.urls);
    //   },
    // });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        clearInterval(this.interval);
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  selectImages(ev: any) {
    const retrievedInput = ev.target;
    console.log('what input', retrievedInput);
    const retrievedTheme = this.selectImage.getImages(retrievedInput).subscribe(
      (data) => console.log('que', data)

      // data === this.themeToShow
    );

    // this.store.getTheme(this.theme);

    console.log(retrievedTheme);
    // localStorage.setItem(
    //   'savedThemes',
    //   JSON.stringify(this.imagesForm.value)
    // );

    // return this.images;
  }
  submit() {
    const retrievedThemes = this.store.getTheme('savedThemes');
    return retrievedThemes;
    //  this.store.getImage().subscribe({
    //     this.imagesForm.get("image").setValue()

    //  }
    //  );
  }
}
