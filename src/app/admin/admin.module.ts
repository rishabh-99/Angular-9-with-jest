import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
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
import { OrderDescriptionComponent } from './components/order-description/order-description.component';
import { ProductDescriptionComponent } from '../shared/components/product-description/product-description.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireStorageModule } from '@angular/fire/storage/public_api';
import { HttpClientModule } from '@angular/common/http';
import { HomePageManagementComponent } from './components/home-page-management/home-page-management.component';
// import { MatTabsModule } from '@angular/material/tabs';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HomeComponent } from '../core/components/home/home.component';
import { HomeService } from './services/home.service';
// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';
 
// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';

// Import the plugin styles
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginImageValidateSize);



export const routes: Routes = [
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
    path: 'admin/orders/:id',
    component: OrderDescriptionComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/home',
    component: HomePageManagementComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  }
]
@NgModule({
  imports: [
    // MatTabsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    MatChipsModule,
    CdkTableModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
    FilePondModule
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrderDescriptionComponent,
    HomePageManagementComponent,
  ],
  providers: [
    HomeService
  ]
})
export class AdminModule { }
