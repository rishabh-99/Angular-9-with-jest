import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsComponent } from './admin-products.component';
import { DebugElement } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { routes } from '../../admin.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from 'src/app/shared/services/product.service';
import { of } from 'rxjs';
import { OrderDescriptionComponent } from '../order-description/order-description.component';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;
  let de: DebugElement;

  beforeEach(async(() => {

    const ProductServiceStub = {
      update: (a) => new Promise(() => 'true'),
      get: (a) => of(
        {
          brand: 'Pen', category: 'Accessories', description: 'sdsd', discount: 1,
          imageUrl: 'http://a.coma', price: 1000, property: [{ propertyId: 'aa', propertyName: 'aa' }], timesBought: 0, title: 'aa'
        }
      ),
  
      create: (a) => true,
      getEverything: () => of([{"brand":"Pen","category":"Accessories","description":"sdsd","discount":1,"imageUrl":"http://a.coma","price":1000,"property":[{"propertyId":"aa","propertyName":"aa"}],"timesBought":0,"title":"aa","$key":"-M1kxo4192D7nFY7y9F8"},{"brand":"23","category":"Hard Disk","description":"wew","imageUrl":"http://a.com","price":1,"timesBought":0,"title":"dssdsd","$key":"-M1l-V7qHxPNMnClPDtn"},{"brand":"232","category":"DVR","description":"sdas","imageUrl":"http://a.com","price":232,"timesBought":0,"title":"bbb","$key":"-M1lFlC6r27QAkYIESUX"},{"brand":"No Brands","category":"IP CCTV Camera","description":"Night Vision Feature\nNo of Channels: 0\n1080 P Full HD resolution\nUltra-wide 130 degree Angle Lens\nAdvanced AI Motion Detection\nTalkback feature ( 2-way audio )\nUpto 64GB micro-SD storage","discount":1000,"imageUrl":"https://www.pngkey.com/png/detail/285-2855401_cctv-clip-art-cctv-camera-png.png","price":10000,"property":[{"propertyId":"brand","propertyName":"kugelblitz"},{"propertyId":"origin","propertyName":"banglore"},{"propertyId":"type","propertyName":"cctv"}],"timesBought":0,"title":"HikVision 2 MP IR Camera DS-2CD2420F-I","$key":"-M1u5G9pSNN_YqsXd7k5"}])
    }
    TestBed.configureTestingModule({
      declarations: [AdminProductsComponent, ProductFormComponent, OrderDescriptionComponent, AdminOrdersComponent],
      providers: [
        { provide: ProductService, useValue: ProductServiceStub }
      ],
      imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSortModule,
        BrowserAnimationsModule, RouterTestingModule.withRoutes(routes), ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
