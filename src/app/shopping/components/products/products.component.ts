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
      .getAll().pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category') || 'all';
        this.brandService.getFor(this.category).forEach(p => this.brands = p);
        this.brand = params.get('brand') || 'all';
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
