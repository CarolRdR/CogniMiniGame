import { TestBed } from '@angular/core/testing';

import { SelectImageService } from './select-image.service';

describe('SelectImageService', () => {
  let service: SelectImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
