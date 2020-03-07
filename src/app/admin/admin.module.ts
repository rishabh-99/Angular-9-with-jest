import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RouterModule } from '@angular/router';
// import { DataTableModule } from 'angular-4-data-table';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CdkTableModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ]
})
export class AdminModule { }
