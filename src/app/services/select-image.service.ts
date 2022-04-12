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
  // observe: 'response',
  // params: 'HttpParams',
  // responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class SelectImageService {
  images = [];

  constructor(private http: HttpClient) {}

  getImages(inputValue: any): Observable<any> {
    const { theme1, theme2 } = inputValue;

    const URL_THEME1 = `https://api.unsplash.com/search/photos?query=${theme1}&client_id=MKLrI3iUoQdrH-IDniebI-1uJ2yh0LWM1ezPIsvN36k`;
    const URL_THEME2 = `https://api.unsplash.com/search/photos?query=${theme2}&client_id=MKLrI3iUoQdrH-IDniebI-1uJ2yh0LWM1ezPIsvN36k`;

    const dataTheme1 = this.http.get(URL_THEME1).pipe(
      map((data: any) => {
        const imageData = data?.results;

        return imageData?.map((item: any) => {
          return item.urls.small;
        });
      })
    );

    const dataTheme2 = this.http.get(URL_THEME2).pipe(
      map((data: any) => {
        const imageData = data?.results;

        return imageData?.map((item: any) => {
          return item.urls.small;
        });
      })
    );
    const mergedData = [];
    mergedData.push(dataTheme1);
    mergedData.push(dataTheme2);

    forkJoin(mergedData)
      .pipe(
        map((data) => data.reduce((result, arr) => [...result, ...arr], []))
      )
      .subscribe((data) => {
        this.images = data;
      });

    return forkJoin(mergedData);
  }
}
