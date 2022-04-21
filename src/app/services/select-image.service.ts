import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, merge, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchImagesI } from '../interfaces';

const apiKey = environment.unsplash.UNSPLASH_API_KEY;
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Client-ID ' + apiKey,
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SelectImageService {
  images = [];
  errorMessage = '';

  constructor(private http: HttpClient) {}

  getImages(inputValue: any): Observable<any> {
    const { theme1, theme2 } = inputValue;

    const URL_THEME1 = `https://api.unsplash.com/search/photos?query=${theme1}&per_page=15`;
    const URL_THEME2 = `https://api.unsplash.com/search/photos?query=${theme2}&per_page=15`;

    const dataTheme1 = this.http.get(URL_THEME1, httpOptions).pipe(
      map((data: any) => {
        const imageData = data?.results;

        return imageData?.map((item: any) => {
          return [item.urls.small, item.tags[0]?.title, item.tags[1]?.title];
        });
      })
    );

    const dataTheme2 = this.http.get(URL_THEME2, httpOptions).pipe(
      map((data: any) => {
        const imageData = data?.results;

        return imageData?.map((item: any) => {
          return [item.urls.small, item.tags[0]?.title, item.tags[1]?.title];
        });
      })
    );

    const mergedData = [];
    mergedData.push(dataTheme1);
    mergedData.push(dataTheme2);

    const merged = forkJoin(mergedData);
    merged.subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });

    return forkJoin(mergedData);
  }
}
