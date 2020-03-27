import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageManagementComponent } from './home-page-management.component';

describe('HomePageManagementComponent', () => {
  let component: HomePageManagementComponent;
  let fixture: ComponentFixture<HomePageManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
