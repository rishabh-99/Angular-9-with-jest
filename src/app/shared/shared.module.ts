import { BrandService } from './services/brand.service';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { DataTableModule } from 'angular-4-data-table/dist';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    // DataTableModule,
    // AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'shared/products/:id',
        component: ProductDescriptionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'shared/',
        component: ProductDescriptionComponent,
        canActivate: [AuthGuard]
      },

    ])
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    ProductDescriptionComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    // DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    BrandService
  ]
})
export class SharedModule { }
