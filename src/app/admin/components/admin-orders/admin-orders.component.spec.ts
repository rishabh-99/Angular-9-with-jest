import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';


import { AdminOrdersComponent } from './admin-orders.component';
import { Sort, MatSort, MatSortModule } from '@angular/material/sort';
import { OrderService } from '../../../shared/services/order.service';
import { of } from 'rxjs/observable/of';
import { FIREBASE_OPTIONS, FirebaseApp, AngularFireModule, FIREBASE_APP_NAME } from '@angular/fire';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../admin.module';
import { ProductFormComponent } from '../product-form/product-form.component';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { OrderDescriptionComponent } from '../order-description/order-description.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { interval } from 'rxjs';

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;
  let serviceStub: any;

  beforeEach(() => {

    let data = [{
      payload: {
        datePlaced: 1576356490725,
        items: {
          0: {
            product: {
              imageUrl: 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
              price: 2.5,
              title: 'Spinach'
            },
            quantity: 3,
            totalPrice: 7.5
          },
          1: {
            product: {
              imageUrl: 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
              price: 3,
              title: 'Freshly Baked Bread'
            },
            quantity: 3,
            totalPrice: 9
          },
          2: {
            product: {
              imageUrl: 'https://pixnio.com/free-images/2017/03/17/2017-03-17-09-15-56.jpg',
              price: 1.75,
              title: 'Avacado'
            },
            quantity: 1,
            totalPrice: 1.75
          }
        },
        shipping: {
          addressLine1: 'aa',
          addressLine2: 'aa',
          city: 'aa',
          name: 'aa'
        },
        userId: 'ga4uXHcpNQcx3ZKN9afi3hkOVqm2'
      },
      type: 'value',
      prevKey: null,
      key: '-Lw59mq9joFWrO4KSBQb'
    }, {
      payload: {
        datePlaced: 1576392186295,
        items: {
          0: {
            product: {
              imageUrl: 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
              price: 2.5,
              title: 'Spinach'
            },
            quantity: 4,
            totalPrice: 10
          },
          1: {
            product: {
              imageUrl: 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
              price: 3,
              title: 'Freshly Baked Bread'
            },
            quantity: 5,
            totalPrice: 15
          }
        },
        shipping: {
          addressLine1: 'fdl',
          addressLine2: 'dfl',
          city: 'aw;ad2s',
          name: 'fdl;k'
        },
        userId: 'Ugw7lhMQtkVbVnqRvL78Ay1wAq32'
      },
      type: 'value',
      prevKey: '-Lw59mq9joFWrO4KSBQb',
      key: '-Lw7HxZHDnov5Qrr-SUM'
    }, {
      payload: {
        datePlaced: 1576396999306,
        items: {
          0: {
            product: {
              imageUrl: 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
              price: 2.5,
              title: 'Spinach'
            },
            quantity: 5,
            totalPrice: 12.5
          },
          1: {
            product: {
              imageUrl: 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
              price: 3,
              title: 'Freshly Baked Bread'
            },
            quantity: 3,
            totalPrice: 9
          }
        },
        shipping: {
          addressLine1: 'ds2f',
          addressLine2: 'ds2f',
          city: 'df',
          name: 'fdf'
        },
        userId: 'Ugw7lhMQtkVbVnqRvL78Ay1wAq32'
      },
      type: 'value',
      prevKey: '-Lw7HxZHDnov5Qrr-SUM',
      key: '-Lw7_J_kINhVDOKcM1zx'
    }, {
      payload: {
        datePlaced: 1580671178803,
        items: {
          0: {
            product: {
              imageUrl: 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
              price: 2.5,
              title: 'Spinach'
            },
            quantity: 1,
            totalPrice: 2.5
          },
          1: {
            product: {
              imageUrl: 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
              price: 3,
              title: 'Freshly Baked Bread'
            },
            quantity: 1,
            totalPrice: 3
          }
        },
        shipping: {
          addressLine1: 'as',
          addressLine2: 'ads',
          city: 'ad',
          name: 'as'
        },
        userId: 'Ugw7lhMQtkVbVnqRvL78Ay1wAq32'
      },
      type: 'value',
      prevKey: '-Lw7_J_kINhVDOKcM1zx',
      key: '-M-6L0S1Z2G6Q9XyVx85'
    }, {
      payload: {
        datePlaced: 1581026999996,
        items: {
          0: {
            product: {
              imageUrl: 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
              price: 3,
              title: 'Freshly Baked Bread'
            },
            quantity: 1,
            totalPrice: 3
          }
        },
        shipping: {
          addressLine1: 'Hanumante Gauda Road',
          addressLine2: '30r,#402 Plot No 38,39',
          city: 'T.Dasaharalli, Bengaluru',
          name: 'Hardik SARIN'
        },
        userId: '0Rs05OmOBWfIlTM3GNTnqh6mMJO2'
      },
      type: 'value',
      prevKey: '-M-6L0S1Z2G6Q9XyVx85',
      key: '-M-RYMrAE7uOCJqOcG4l'
    }, {
      payload: {
        datePlaced: 1583522855351,
        items: {
          0: {
            product: {
              imageUrl: 'http://a.coma',
              price: 1000,
              title: 'aa'
            },
            quantity: 1,
            totalPrice: 1000
          },
          1: {
            product: {
              imageUrl: 'http://a.com',
              price: 232,
              title: 'bbb'
            },
            quantity: 1,
            totalPrice: 232
          }
        },
        shipping: {
          addressLine1: 'eqwsd',
          addressLine2: 'asa',
          city: 'sass',
          name: 'sas'
        },
        userId: 'ga4uXHcpNQcx3ZKN9afi3hkOVqm2'
      },
      type: 'value',
      prevKey: '-M-RYMrAE7uOCJqOcG4l',
      key: '-M1lJIXVViEAicOZ2J9w'
    }];

    serviceStub = {
      getOrders: () => of(data)
    }

    TestBed.configureTestingModule({
      declarations: [AdminProductsComponent, ProductFormComponent, OrderDescriptionComponent, AdminOrdersComponent],
      providers: [{ provide: OrderService, useValue: serviceStub }],
      imports: [MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSortModule,
        BrowserAnimationsModule, RouterTestingModule.withRoutes(routes), ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    // fixture.detectChanges()
    expect(component).toBeTruthy();
  });
  

});
