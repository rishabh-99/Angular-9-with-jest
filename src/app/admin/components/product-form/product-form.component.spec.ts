import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule, FormGroupDirective } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../admin.module';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SnapshotAction } from '@angular/fire/database/database';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { OrderDescriptionComponent } from '../order-description/order-description.component';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';


describe('ProductFormComponents', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let de: DebugElement

  const CategoryServiceStub = {
    getA: () => of([{ name: 'AA' }])
  }
  const ProductServiceStub = {
    update: (a) => new Promise(() => 'true'),
    get: (a) => of(
      {
        brand: 'Pen', category: 'Accessories', description: 'sdsd', discount: 1,
        imageUrl: 'http://a.coma', price: 1000, property: [{ propertyId: 'aa', propertyName: 'aa' }], timesBought: 0, title: 'aa'
      }
    ),

    create: (a) => true
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductsComponent, ProductFormComponent, OrderDescriptionComponent, AdminOrdersComponent],
      providers: [
        { provide: CategoryService, useValue: CategoryServiceStub },
        { provide: ProductService, useValue: ProductServiceStub }
      ],
      imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSortModule,
        BrowserAnimationsModule, RouterTestingModule.withRoutes(routes), ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(component.title).toBe('Product Form')
  });

  it('should create property', () => {
    expect(component.createProperty()).toBeTruthy()
  });

  it('recreateProperty should not take any other input', () => {
    expect(component.reCreateProperty('aa')).toBeNull()
  });

  it('Create Property Works Properly', () => {
    component.properties.push(component.createProperty());
    expect(component.properties.length).toBe(1)
  });

  it('Product is recreated', () => {
    component.id = 'AAAA'
    expect(component.product).toBeTruthy()
    expect(component.brand$).toBeTruthy()
  });

});
