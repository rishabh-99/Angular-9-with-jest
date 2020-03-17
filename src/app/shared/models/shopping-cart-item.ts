import { Product } from './product';

export class ShoppingCartItem {
  $key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  discount: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    let p = (this.price - this.price * this.discount * .01) * this.quantity;
    return p;
  }
  get totalDiscount() {
    let p = (this.price * this.discount * .01) * this.quantity;
    return p;
  }
  get totalNonDiscountedPrice() {
    let p = (this.price) * this.quantity;
    return p;
  }
}