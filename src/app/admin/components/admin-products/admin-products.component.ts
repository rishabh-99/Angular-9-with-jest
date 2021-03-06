import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/shared/services/product.service';
import { toArray } from 'rxjs/operators';



/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'category', 'link'];
  dataSource: MatTableDataSource<any>;
  result;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService) {
    // Create 100 users

    // var a = this.productService.getEverything().on('value', (data) => {
    //   this.dataSource = new MatTableDataSource(data.val());
    //   console.log()

  
    // })
    this.dataSource = new MatTableDataSource();

    // Assign the data to the data source for the table to render

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.productService.getEverything().query.on('value', data => {
      let obj = data.toJSON();
      this.result = Object.keys(obj).map((key) => {

        // Using obj[key] to retrieve key value 
        let rd = obj[key]
        rd.$key = key;
        return rd;
      });
      console.log(this.result)
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.result;
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
    const data = this.result.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'category': return compare(a.category, b.category, isAsc);
        default: return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}