import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDescriptionService } from 'src/app/shared/services/order-description.service';

@Component({
  selector: 'app-order-description',
  templateUrl: './order-description.component.html',
  styleUrls: ['./order-description.component.css']
})
export class OrderDescriptionComponent implements OnInit {
  id;

  constructor(private route: ActivatedRoute, private orderService: OrderDescriptionService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.orderService.getOrder(this.id).query.on('value', data => {
        console.log(data.val())
      })
    }
  }

  ngOnInit(): void {
  }

}
