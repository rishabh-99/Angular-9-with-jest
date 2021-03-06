import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.database.ref('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.database.ref('/orders').orderByChild('userId').equalTo(userId);
  }
}
