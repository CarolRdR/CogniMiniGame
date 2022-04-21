import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectImageService } from 'src/app/services/select-image.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  @Input() themeToShow!: string | undefined;
  @Input()
  required!: boolean | string;

  themeForm!: FormGroup;
  imageList: string[] = [];
  errorMessage = '';
  nameImage: string = '';

  constructor(
    private router: Router,
    public selectImage: SelectImageService,
    public store: StoreService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.themeForm = this.fb.group({
      theme1: ['', [Validators.required]],
      theme2: ['', [Validators.required]],
    });
  }

  selectWords1(ev: any): void {
    const inputValue = ev.target.value as string;

    if (inputValue.length < 3) {
      this.imageList = [];
      return;
    }

    this.selectImage.getImages(this.themeForm.value).subscribe((data: any) => {
      let mergedData = [].concat.apply([], data);

      this.imageList = mergedData;
    });
  }

  sendInfo(): any {
    this.store.setImage(this.imageList);

    localStorage.setItem('savedThemes', JSON.stringify(this.themeForm.value));

    this.router.navigate([`game`]);
  }
}
