import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from "../../../shared/models/order";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userSubscription: Subscription;
  userId: string;
  isPincodeValid;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  checkPincode() {
    // this.orderService.getPincodes().subscribe(data => {
      
    // })
    this.orderService.getPincodes().subscribe(data => {
      if(data.indexOf(`${this.shipping.pincode}`) > -1) {
        this.isPincodeValid = true;
        alert('Your area is servicable');
      } else {
        this.isPincodeValid = false;
        alert('Your area is not servicable');
      }
    })
  }
}
