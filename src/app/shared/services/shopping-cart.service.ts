import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Order } from '../models/order';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(map((x: any) => {
      if (x != null) { return new ShoppingCart(x.items) } else {
        return new ShoppingCart(null)
      }
    }));

  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    console.log(product.$key)
    let item$ = this.getItem(cartId, product.$key);
    // console.log(item$)
    // item$.update({
    //   title: product.title,
    //   imageUrl: product.imageUrl,
    //   price: product.price,
    //   quantity: 1
    // });
    item$.query.once('value', itema => {
      var item = itema.val();
      if (item == undefined) {
        item = { quantity: 0 }
      }

      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) { item$.remove(); }
      else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          discount: product.discount,
          quantity: quantity
        });
      }
    })
    // .subscribe((item:any) => {
    //   console.log(item)


    //  
    // })
    // .subscribe((item: any) => {
    //   console.log(item)
    //   let quantity = (item.quantity || 0) + change;
    //   if (quantity === 0) item$.remove();
    //   else item$.update({
    //     title: product.title,
    //     imageUrl: product.imageUrl,
    //     price: product.price,
    //     quantity: quantity
    //   });
    // });
  }
}
