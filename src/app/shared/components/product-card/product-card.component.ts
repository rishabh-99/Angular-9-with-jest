import { Router } from '@angular/router';
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

  constructor(private cartService: ShoppingCartService, private router: Router) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  goToId(id) {
    this.router.navigate([`/shared/products/${id}`]);
  }
  async buyNow() {
    await this.cartService.clearCart()
    await this.cartService.addToCart(this.product);

    this.router.navigate(['/check-out']);
  }
}
