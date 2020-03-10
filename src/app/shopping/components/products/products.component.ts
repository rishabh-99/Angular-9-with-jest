import { BrandService } from './../../../shared/services/brand.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';
import { AngularFireObject } from '@angular/fire/database/database';
// tslint:disable: no-inferrable-types
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  category: string = 'all';
  brand: string = 'all';
  brands: any[] = [];
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private brandService: BrandService
  ) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();

  }

  private populateProducts() {
    this.productService
      .getAll().snapshotChanges()
      .switchMap((products: any) => {
        console.log(products[0].payload)
        for (let i = 0; i < products.length; i++) {
          this.products[i] = products[i].payload.val();
          this.products[i].$key = products[i].payload.key;
        }
        // this.products = products;
        // this.pro
        // console.log(this.products)
        return this.route.queryParamMap;
      })

      .subscribe(params => {
        this.category = params.get('category') || 'all';
        this.brandService.getFor(this.category).on('value', data => {
          let obj = data.toJSON();
          if (obj === null) {
            obj = { none: { name: 'None', $key: 'none' } }
          }
          console.log(obj)
          this.brands = Object.keys(obj).map((key) => {

            // Using obj[key] to retrieve key value 
            let rd = obj[key]
            rd.$key = key;
            return rd;
          });
        })
        this.brand = params.get('brand') || 'all';
        console.log(this.brands)
        this.applyFilter();
      });
  }


  private applyFilter() {
    // this.filteredProducts = (this.category) ?
    //   this.products.filter((p) =>
    //     p.category === this.category && p.brand === this.brand
    //   ) :
    //   this.products;
    if (this.brand === 'all' && this.category === 'all') {
      this.filteredProducts = this.products;
    } else if (this.category && this.brand === 'all') {
      this.filteredProducts = this.products.filter(p => p.category === this.category);
    } else if (this.brand && this.category === 'all') {
      this.filteredProducts = this.products.filter(p => p.brand === this.brand);
    } else if (this.category && this.brand) {
      this.filteredProducts = this.products.filter(p => p.category === this.category && p.brand === this.brand);
    }
    // this.filteredProducts = (this.brand) ?
    //   this.products.filter(p => p.property[0] === this.brand) :
    //   this.products;
  }

  updateFilteredValue(data) {
    this.applyFilter();
    this.filteredProducts = this.filteredProducts.filter(p => p.price >= data.min && p.price <= data.max);
  }
  updateFilteredValueForDiscount(data) {
    if (data.state === false) {
      this.updateFilteredValue(data);
      this.filteredProducts = this.filteredProducts.filter(p => p.hasDiscount === false);

    } else {
      this.updateFilteredValue(data);
      this.filteredProducts = this.filteredProducts.filter(p => p.hasDiscount === true);
    }
  }
  sortDiscount() {
    this.filteredProducts = this.filteredProducts.sort((a, b) => a.discount - b.discount);
  }
  revSortDiscount() {
    this.filteredProducts = this.filteredProducts.sort((a, b) => b.discount - a.discount);
  }

  sortPrice() {
    this.filteredProducts = this.filteredProducts.sort((a, b) => a.price - b.price);
  }

  revSortPrice() {
    this.filteredProducts = this.filteredProducts.sort((a, b) => b.price - a.price);
  }

  sortPopularity() {
    this.filteredProducts = this.filteredProducts.sort((a, b) => a.timesBought - b.timesBought);
  }

  revSortPopularity() {
    this.filteredProducts = this.filteredProducts.sort((a, b) => b.timesBought - a.timesBought);
  }
}
