import { Product } from './../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/take';
import { FormArray, FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { ShoppingCart } from '../../models/shopping-cart';


@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  @Input('product') product2: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  categories$;
  product: Product = new Product();
  properties: FormArray = this.fb.array([]);
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).subscribe((p) => {
        this.product = p.payload.val() as Product;
      });
    }

  }
  ngOnInit() {
  }

}
