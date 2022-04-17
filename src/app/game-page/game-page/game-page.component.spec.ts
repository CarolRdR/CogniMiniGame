import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GamePageComponent } from './game-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreService } from 'src/app/services/store.service';
import { of, throwError } from 'rxjs';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;

  let storeService: StoreService;

  const mockStoreService = {
    getImage: jasmine.createSpy('getImage'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePageComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: StoreService, useValue: mockStoreService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePageComponent);
    storeService = TestBed.inject(StoreService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getImage from store', () => {
    it('returns images', async () => {
      mockStoreService.getImage.and.returnValue(of({}));
      fixture.detectChanges();

      expect(component).toBeTruthy();
      expect(component.store.getImage).toHaveBeenCalled();
    });
    it('does not return an image', async () => {
      mockStoreService.getImage.and.returnValue(throwError(() => new Error()));
      fixture.detectChanges();

      expect(component).toBeTruthy();
      expect(component.store.getImage).toHaveBeenCalled();
    });
  });
  describe('selectImages from grid', () => {
    const event = { target: { alt: '' } };
    it('should be invalid', async () => {
      mockStoreService.getImage.and.returnValue(of({}));
      fixture.detectChanges();
      component.selectImages(event);

      expect(component).toBeTruthy();
      expect(component.store.getImage).toHaveBeenCalled();
    });
  });
  describe('selectImages from grid', () => {
    const event = { target: { alt: 'cat' } };
    it('should be valid', async () => {
      mockStoreService.getImage.and.returnValue(of({}));
      fixture.detectChanges();
      component.selectImages(event);

      expect(component).toBeTruthy();
      expect(component.store.getImage).toHaveBeenCalled();
    });
  });
});
