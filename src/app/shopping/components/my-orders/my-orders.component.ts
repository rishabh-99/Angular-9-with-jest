import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;
  temp;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private orderService: OrderService) {
    authService.user$.subscribe(u => {
      orderService.getOrdersByUser(u.uid).on('value', (data) => {
        let obj = data.toJSON();
        console.log(obj)
        this.orders$ = Object.keys(obj).map((key) => {

          // Using obj[key] to retrieve key value 
          let rd = obj[key]
          rd.$key = key;
          return rd;
        });
        console.log(this.orders$)
        let i = 0;
        for (const order of this.orders$) {
          let obj = order.items;
          this.orders$[i].items = Object.keys(obj).map((key) => {

            // Using obj[key] to retrieve key value 
            let rd = obj[key]
            rd.$key = key;
            return rd;
          });
          this.orders$[i].items.$key = true;
          i++;
        }
      });
    });
  }
  submitRating(orderKey, index, rating, key) {
    // console.log({ orderKey, index, rating })
    this.orderService.updateRating(orderKey, index, rating)
    this.productService.updateRating(key, rating)
  }
}
