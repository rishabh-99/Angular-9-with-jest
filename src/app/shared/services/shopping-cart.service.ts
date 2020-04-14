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
    this.db.object('/shopping-carts/' + cartId).update({ totalQuantity: 0 });
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      totalQuantity: 0,
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private getC(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
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
    let c = this.getC(cartId);



    let item$ = this.getItem(cartId, product.$key);

    item$.query.once('value', async (itema) => {
      var item = itema.val();
      if (item == undefined) {
        item = { quantity: 0 }
      }

      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) {
        item$.remove();
        c.query.once('value', data => {
          let oldQ = data.val().totalQuantity;
          const newQ = oldQ + change;
          c.update({ totalQuantity: newQ })
        })
      } else if (quantity <= 10) {

        c.query.once('value', data => {
          let oldQ = data.val().totalQuantity;
          if (change < 0) {
            item$.update({
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              discount: product.discount,
              quantity: quantity
            });
            const newQ = oldQ + change;
            c.update({ totalQuantity: newQ })
          } else if (oldQ <= 49) {
            item$.update({
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              discount: product.discount,
              quantity: quantity
            });
            const newQ = oldQ + change;
            c.update({ totalQuantity: newQ })
          }
        })


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
