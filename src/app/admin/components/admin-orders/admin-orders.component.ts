import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$;
  displayedColumns: string[] = ['customer', 'date', 'link'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private orderService: OrderService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.orderService.getOrders().on('value', (data) => {
      console.log(data.val())
      let obj = data.toJSON();
      this.orders$ = Object.keys(obj).map((key) => {

        // Using obj[key] to retrieve key value 
        let rd = obj[key]
        rd.$key = key;
        return rd;
      });
      console.log(this.orders$)
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.orders$;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sortData(sort: Sort) {
    const data = this.orders$.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'customer': return compare(a.shipping.name, b.shipping.name, isAsc);
        case 'date': return compare(a.datePlaced, b.datePlaced, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}