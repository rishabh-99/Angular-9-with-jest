import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerBannerComponent } from './lower-banner.component';

describe('LowerBannerComponent', () => {
  let component: LowerBannerComponent;
  let fixture: ComponentFixture<LowerBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowerBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
