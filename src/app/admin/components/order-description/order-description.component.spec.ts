import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDescriptionComponent } from './order-description.component';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../admin.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderDescriptionService } from 'src/app/shared/services/order-description.service';
import { of } from 'rxjs';

describe('OrderDescriptionComponent', () => {
  let component: OrderDescriptionComponent;
  let fixture: ComponentFixture<OrderDescriptionComponent>;

  beforeEach(async(() => {

    const OrderDescriptionServiceStub = {
      getOrder: () => of('')
    }
    TestBed.configureTestingModule({
      declarations: [AdminProductsComponent, ProductFormComponent, OrderDescriptionComponent, AdminOrdersComponent],
      providers: [
        { provide: OrderDescriptionService, useValue: OrderDescriptionServiceStub }
      ],
      imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSortModule,
        BrowserAnimationsModule, RouterTestingModule.withRoutes(routes), RouterTestingModule, ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
