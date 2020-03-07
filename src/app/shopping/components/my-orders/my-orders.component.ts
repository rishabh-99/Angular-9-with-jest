import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

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
    private orderService: OrderService) {
    authService.user$.subscribe(u => {
      orderService.getOrdersByUser(u.uid).on('value', (data) => {
        let obj = data.toJSON();
        this.orders$ = Object.keys(obj).map((key) => {

          // Using obj[key] to retrieve key value 
          let rd = obj[key]
          rd.$key = key;
          return rd;
        });
      });
    });
  }
}
