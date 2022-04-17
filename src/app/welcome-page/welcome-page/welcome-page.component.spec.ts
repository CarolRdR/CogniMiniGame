import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WelcomePageComponent } from './welcome-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectImageService } from 'src/app/services/select-image.service';
import { of } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;
  let selectWords: SelectImageService;
  let storeService: StoreService;

  const mockSelectWordsService = {
    getImages: jasmine.createSpy('getImages'),
  };
  const mockStoreService = {
    getImage: jasmine.createSpy('getImage'),
    setImage: jasmine.createSpy('setImage'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomePageComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: SelectImageService, useValue: mockSelectWordsService },
        { provide: StoreService, useValue: mockStoreService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageComponent);
    selectWords = TestBed.inject(SelectImageService);
    storeService = TestBed.inject(StoreService);
    component = fixture.componentInstance;
  });
  describe('selectWords1 to have been called', () => {
    const event1 = { target: { value: 'cat' } };
    const event2 = { target: { value: 'dog' } };
    it('should be valid', async () => {
      mockSelectWordsService.getImages.and.returnValue(of([]));

      fixture.detectChanges();
      component.selectWords1(event1);
      component.selectWords1(event2);

      expect(component).toBeTruthy();
      expect(component.selectImage.getImages).toHaveBeenCalled();
    });
  });
  describe('selectWords1 not to have been called', () => {
    const event1 = { target: { value: '' } };
    const event2 = { target: { value: '' } };
    it('should be invalid', async () => {
      mockSelectWordsService.getImages.and.returnValue(of([]));

      fixture.detectChanges();
      component.selectWords1(event1);
      component.selectWords1(event2);

      expect(component).toBeTruthy();
      expect(component.selectImage.getImages).not.toHaveBeenCalled();
    });
  });
});
