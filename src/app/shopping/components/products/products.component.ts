import { BrandService } from './../../../shared/services/brand.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { AngularFireObject } from '@angular/fire/database/database';
import { CategoryService } from 'src/app/shared/services/category.service';
// tslint:disable: no-inferrable-types
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  category: string = 'all';
  brand: string = 'all';
  brands: any[] = [];
  cart$: Observable<ShoppingCart>;
  cart;
  priceUp = true;
  main;
  mainDesc;
  popularityUp = true;
  discountUp = true;
  displayedColumns: string[] = ['product'];
  q;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) {
    this.filteredProducts = new MatTableDataSource();
  }

  async ngOnInit() {
    this.filteredProducts.paginator = this.paginator;
    this.cart$ = await this.shoppingCartService.getCart()
    this.cart$.subscribe(cart => this.cart = cart)
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
        this.filteredProducts.data = this.products;
        this.filteredProducts.paginator = this.paginator;
        return this.route.queryParamMap;
      })

      .subscribe(params => {
        this.category = params.get('category') || 'all';
        this.brand = params.get('brand') || 'all';
        this.q = params.get('q');
        const main = params.get('main') || 'Biometric';
        this.main = params.get('main') || 'Biometric';
        this.categoryService.getHeading(main).subscribe(data => {
          this.mainDesc = data[1].payload.val()
        })

        let catArray = this.category.split(',');
        this.brands = []
        for (let i = 0; i < catArray.length; i++) {

          this.brandService.getFor(main, catArray[i]).subscribe(data => {
            let obj = [];
            let i = 0;
            for (const d of data) {
              obj[i] = d.payload.val()
              obj[i].$key = (d.payload.val() as any).name;
              let b = this.brand.split(',');
              if (b.indexOf(obj[i].name) > -1) {
                obj[i].checked = true;
              } else {
                obj[i].checked = false;
              }
              i++;
            }
            if (obj === null) {
              obj[0] = { none: { name: 'None', $key: 'none' } }
            }
            console.log(obj)
            // let b = Object.keys(obj).map((key) => {

            //   // Using obj[key] to retrieve key value 
            //   let rd = obj[key]
            //   rd.$key = key;
            //   this.brand = params.get('brand') || 'all';
            //   let b = this.brand.split(',');
            //   console.log(b)
            //   if (b.indexOf(rd.name) > -1) {
            //     rd.checked = true;
            //   } else {
            //     rd.checked = false;
            //   }
            //   return rd;
            // });
            this.brands = [...this.brands, ...obj];
            console.log(this.brands)

          })
        }

        this.applyFilter();
      });
  }


  private applyFilter() {
    // this.filteredProducts = (this.category) ?
    //   this.products.filter((p) =>
    //     p.category === this.category && p.brand === this.brand
    //   ) :
    //   this.products;
    let catArray = this.category.split(',');
    let brandArray = this.brand.split(',')
    if (this.q) {
      this.filteredProducts.data = this.products.filter((p) => {
        if (p.brand.toLowerCase().indexOf(this.q.toLowerCase()) > -1 ||
          p.category.toLowerCase().indexOf(this.q.toLowerCase()) > -1 ||
          p.description.toLowerCase().indexOf(this.q.toLowerCase()) > -1 ||
          p.mainCategory.toLowerCase().indexOf(this.q.toLowerCase()) > -1 ||
          p.title.toLowerCase().indexOf(this.q.toLowerCase()) > -1 ||
          p.tags.findIndex((tag, i, o) => {
            if (tag.name.toLowerCase().indexOf(this.q.toLowerCase()) > -1) {

              return true;
            } else {

              return false;
            }
          }) > -1) {
          return true;
        } else { return false; }
      })
    } else if (this.brand === 'all' && this.category === 'all') {
      this.filteredProducts.data = this.products;
    } else if (this.category && this.brand === 'all') {
      console.log(this.filteredProducts.data)
      this.filteredProducts.data = this.products.filter(p => {
        if (catArray.indexOf(p.category) !== -1) {
          return true;
        }
        return false;
      });
      console.log(this.filteredProducts.data)
    } else if (this.brand && this.category === 'all') {
      this.filteredProducts.data = this.products.filter(p => {
        if (brandArray.indexOf(p.brand) !== -1) {
          return true;
        }
        return false;
      });
    } else if (this.category && this.brand) {
      this.filteredProducts.data = this.products.filter(p => {
        if (brandArray.indexOf(p.brand) !== -1 && catArray.indexOf(p.category) !== -1) {
          return true;
        }
        return false;
      });
    }
    // this.filteredProducts = (this.brand) ?
    //   this.products.filter(p => p.property[0] === this.brand) :
    //   this.products;
  }

  updateFilteredValue(data) {
    this.applyFilter();
    this.filteredProducts.data = this.filteredProducts.data.filter(p => p.price >= data.min && p.price <= data.max);
  }
  updateFilteredValueForDiscount(data) {
    if (data.state === false) {
      this.updateFilteredValue(data);
      this.filteredProducts.data = this.filteredProducts.data.filter(p => p.hasDiscount === false);

    } else {
      this.updateFilteredValue(data);
      this.filteredProducts.data = this.filteredProducts.data.filter(p => p.hasDiscount === true);
    }
  }
  sortDiscount() {
    if (this.discountUp) {
      this.filteredProducts.data = this.filteredProducts.data.sort((a, b) => a.discount - b.discount);
      this.discountUp = false;
    } else {
      this.filteredProducts.data = this.filteredProducts.data.sort((a, b) => b.discount - a.discount);
      this.discountUp = true;
    }
  }

  sortPrice() {
    if (this.priceUp) {
      this.filteredProducts.data = this.filteredProducts.data.sort((a, b) => a.price - b.price);
      this.priceUp = false;
    } else {
      this.filteredProducts.data = this.filteredProducts.data.sort((a, b) => b.price - a.price);
      this.priceUp = true;
    }
  }

  sortPopularity() {
    if (this.popularityUp) {
      this.filteredProducts.data = this.filteredProducts.data.sort((a, b) => a.timesBought - b.timesBought);
      this.popularityUp = false;
    } else {
      this.filteredProducts.data = this.filteredProducts.data.sort((a, b) => b.timesBought - a.timesBought);
      this.popularityUp = true;
    }
  }
}

