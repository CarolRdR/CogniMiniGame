import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SelectImageService } from './select-image.service';

describe('SelectImageService', () => {
  let service: SelectImageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SelectImageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When search is called', () => {
    it('httpClient should be called', () => {
      const mockRes = [{}];
      const theme1 = 'cat';
      service.getImages(theme1).subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockRes));
      });

      const req1 = httpTestingController.expectOne({
        method: 'GET',
        url: `https://api.unsplash.com/search/photos?query=${theme1}&per_page=15&client_id=MKLrI3iUoQdrH-IDniebI-1uJ2yh0LWM1ezPIsvN36k`,
      });

      expect(req1.request.url).toBe(
        `https://api.unsplash.com/search/photos?query=${theme1}&per_page=15&client_id=MKLrI3iUoQdrH-IDniebI-1uJ2yh0LWM1ezPIsvN36k`
      );

      req1.flush(mockRes);
    });
  });
  describe('When search is called', () => {
    it('httpClient should be called', () => {
      const mockRes = [{}];

      const theme2 = 'dog';

      service.getImages(theme2).subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockRes));
      });

      const req2 = httpTestingController.expectOne({
        method: 'GET',
        url: `https://api.unsplash.com/search/photos?query=${theme2}&per_page=15&client_id=MKLrI3iUoQdrH-IDniebI-1uJ2yh0LWM1ezPIsvN36k`,
      });

      expect(req2.request.url).toBe(
        `https://api.unsplash.com/search/photos?query=${theme2}&per_page=15&client_id=MKLrI3iUoQdrH-IDniebI-1uJ2yh0LWM1ezPIsvN36k`
      );

      req2.flush(mockRes);
    });
  });
});
