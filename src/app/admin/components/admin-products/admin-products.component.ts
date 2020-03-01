import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  constructor() { 
   
  }


  ngOnDestroy() {
  }

  ngOnInit() {
  }

}
