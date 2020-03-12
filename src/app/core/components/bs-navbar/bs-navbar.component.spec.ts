import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNavbarComponent } from './bs-navbar.component';
import { of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(() => {

    const AuthServiceStub = {
      appUser$: of({ email: 'mehrotra.rishab@gmail.com', isAdmin: true, name: 'Rishabh Mehrotra' }),
      logout: () => { }
    }

    const ShoppingCartServiceStub = {
      getCart: () => new Promise(() => of(''))
    }

    TestBed.configureTestingModule({
      declarations: [BsNavbarComponent],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: ShoppingCartService, useValue: ShoppingCartServiceStub },
      ],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
