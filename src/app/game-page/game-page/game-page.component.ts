import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  imagesInput!: SearchImagesI[];
  theme1!: string;
  theme2!: string;
  imageList: Array<any>;
  images: string[] = [];
  inputValue!: string;
  theme: string;
  errorMessage = '';
  timeLeft: number = 12;
  interval: any;

  constructor(
    public selectImage: SelectImageService,
    public store: StoreService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.imageList = [];
    this.images = [];
    this.theme = '';
  }

  ngOnInit(): void {
    const themes = JSON.parse(localStorage.getItem('savedThemes') || '{}');
    this.theme1 = themes.theme1;
    this.theme2 = themes.theme2;
    this.themeToShow = this.theme1;

    this.store.getImage().subscribe({
      next: (data: any) => {
        console.log(data);
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

        console.log(this.imageList);
        return this.imageList;
        // this.imageList.forEach((item) => {
        //   console.log(item[1], item[2]);
        // });

        // console.log(this.imageList);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });

    // this.imagesForm = this.fb.group({
    //   images: [''],
    // });
  }

  // startTimer() {
  //   this.interval = setInterval(() => {
  //     if (this.timeLeft > 0) {
  //       this.timeLeft--;
  //       clearInterval(this.interval);
  //     } else {
  //       this.timeLeft = 60;
  //     }
  //   }, 1000);
  // }

  selectImages(ev: any) {
    const retrievedInput = ev.target.alt;
    console.log(retrievedInput);

    if (
      retrievedInput === this.themeToShow ||
      retrievedInput === this.themeToShow
    ) {
      return localStorage.setItem('saveTheme', retrievedInput);
    }
    console.log(
      'Igual o no',
      localStorage.setItem('saveTheme', retrievedInput)
    );
  }

  // this.store.getTheme(this.theme);

  // localStorage.setItem(
  //   'savedThemes',
  //   JSON.stringify(this.imagesForm.value)
  // );

  // return this.images;

  submit() {
    this.store.setImage('saveTheme');
    return this.router.navigate([`score`]);

    //  this.store.getImage().subscribe({
    //     this.imagesForm.get("image").setValue()

    //  }
    //  );
  }
}
