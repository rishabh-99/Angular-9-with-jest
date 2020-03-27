import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];
  totalCost: number;
  status:string = 'ordered'

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.totalCost = shoppingCart.totalPrice;

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price,
          key: i.$key,
          rating: 0
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })
  }
}