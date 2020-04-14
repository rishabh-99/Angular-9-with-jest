import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService, private router: Router, private route: ActivatedRoute) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  goToId(id) {
    this.route.queryParamMap.subscribe(param => {
      if (param) {
        this.router.navigate([`/shared/products/${id}`]);
      }
      this.route.queryParamMap.subscribe().unsubscribe();

    });
  }
  async buyNow() {
    // await this.cartService.clearCart()
    await this.cartService.addToCart(this.product);
    this.route.queryParamMap.subscribe(param => {
      if (param) {
        this.router.navigate(['/shopping-cart']);
      }
      this.route.queryParamMap.subscribe().unsubscribe();

    });

  }
}
