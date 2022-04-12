import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchImagesI } from '../interfaces';

const initialState: SearchImagesI = {
  results: {
    id: '',
    description: '',
    alt_description: '',
    tags: '',
    urls: {
      raw: '',
      full: '',
      regular: '',
      small: '',
      thumb: '',
    },
  },

  state: 'default',
};

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private image!: SearchImagesI;
  image$: BehaviorSubject<SearchImagesI>;

  constructor() {
    this.image$ = new BehaviorSubject(initialState);
  }

  setImage(image: any) {
    this.image = image;
    console.log('Ticking next');
    this.image$.next(this.image);
  }

  getImage() {
    return this.image$;
  }

  public getTheme(theme: string): string | null {
    let retrievedThemes = localStorage.getItem('theme');
    return retrievedThemes;
  }
  public saveTheme(theme: string): void {
    localStorage.removeItem('theme');
    localStorage.setItem('theme', theme);
  }
}
