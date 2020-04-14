import { Product } from './../../../shared/models/product';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/take';
import { FormArray, FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  categories$;
  product: Product = new Product();
  product$;
  properties: FormArray = this.fb.array([]);
  id;
  cart$: Observable<ShoppingCart>;
  cart;
  InPincode;
  isPincodeValid;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private cartService: ShoppingCartService,
    private orderService: OrderService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        // window.scrollTo(0, 0);
      }
    });

  }
  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(data => {
      this.cart = data;
      console.log(this.cart)
    })
    this.categories$ = this.categoryService.getAll();


    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).subscribe((p) => {
        this.product = p.payload.val() as Product
        this.product.$key = p.key

        console.log(this.product)

        this.productService.getEverything().subscribe(data => {
          // this.product$ = data;

          this.product$ = data.filter(d => {
            let p: any = d.payload.val();
            if (p.category === this.product.category) {
              return true;
            } else {
              return false;
            }
          });
        });
      });
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.categories$ = this.categoryService.getAll();
  }

  nav(key) {
    this.router.navigate([`/shared/products/${key}`]);

  }
  async buyNow() {
    // await this.cartService.clearCart()
    await this.cartService.addToCart(this.product);

    this.router.navigate(['/shopping-cart']);
  }

  checkPincode() {
    // this.orderService.getPincodes().subscribe(data => {

    // })
    this.orderService.getPincodes().subscribe(data => {
      console.log(data)
      if (data.indexOf(`${this.InPincode}`) > -1) {
        this.isPincodeValid = true;
        alert('Your area is servicable');
      } else {
        this.isPincodeValid = false;
        alert('Your area is not servicable');
      }
    })

  }
}
