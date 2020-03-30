import { Product } from './../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/take';
import { FormArray, FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  categories$;
  product: Product = new Product();
  properties: FormArray = this.fb.array([]);
  id;
  cart$: Observable<ShoppingCart>;
  cart;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private cartService: ShoppingCartService) {
    this.categories$ = categoryService.getAll();


    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).subscribe((p) => {
        this.product = p.payload.val() as Product
        this.product.$key = p.key

        console.log(this.product)
      });
    }

  }
  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    console.log('AA')
    this.cart$.subscribe(data => {
      this.cart = data;
      console.log(this.cart)
    })
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  async buyNow() {
    await this.cartService.clearCart()
    await this.cartService.addToCart(this.product);

    this.router.navigate(['/check-out']);
  }

}
