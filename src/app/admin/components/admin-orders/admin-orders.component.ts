/**
 * This file contains Admin-order related data
 * @packageDocumentation
 */
// Core Imports
import { Component, OnInit, ViewChild } from '@angular/core';
// Project Imports
import { OrderService } from '../../../shared/services/order.service';
// Angular Imports
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { database } from 'firebase';
import { SnapshotAction } from '@angular/fire/database/database';

/**
 * @title Admin's View Order Page.
 */

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})

export class AdminOrdersComponent implements OnInit {

  orderClass = false;
  processingClass = false;
  completedClass = false;
  search;
  filteredOrders: Array<any> = [];
  /**
   * orders$ is used by HTML to iterate through the list of orders.
   */
  orders$: Array<any> = [];
  /**
   * displayedColumns is an array of Column names for mat-table.
   */
  displayedColumns: string[] = ['customer', 'date', 'link'];
  /**
   * dataSource is used as input for the mat-table.
   * @category Angular Material
   */
  dataSource: MatTableDataSource<any>;
  /**
   * Used for all Paginations.
   */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  /**
   * Used for all Sortings.
   */
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * @param orderService It has all the firebase functions related to Order Pages.
   * To initialize dataSource
   */

  constructor(private orderService: OrderService) {

  }
  /**
   * It is used for lifecycle hook.
   */
  ngOnInit() {
    /**
     * Using getOrders to get all the Orders from Firebase.
     * @category FireBase Call
     */
    this.orderService.getOrders().subscribe((data) => {
      let i = 0;
      for (const d of data) {
        this.orders$[i] = d.payload.val();
        this.orders$[i].$key = d.payload.key;
        this.orders$[i].name = this.orders$[i].shipping.name;
        i++;
      }

      this.dataSource = new MatTableDataSource(this.orders$);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filteredOrders = this.orders$;
      this.filterOrder();
      console.log(this.orders$);
    });
  }
  /**
   * It is used to filter the table data based on the input text.
   * @param event Used to input data from the DOM.
   */
  applyFilter(event: Event) {
    // Retrieving the input value.
    const filterValue = (event.target as HTMLInputElement).value;
    // Applying filter on dataSource based on the filterValue.
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // To go to the first page of the paginator.
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * It is used to sort data based on selected column.
   * @param sort Using Sort interface of Angular Material.
   * @category Angular Material
   */
  sortData(sort: Sort) {
    const data = this.orders$.slice();
    // If the element doesn't have Sorting enabled.
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    // Actual Sorting starts here.
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      // Switch case to know sorting is for which column, Column name should be same as case.
      switch (sort.active) {
        case 'customer': return compare(a.shipping.name, b.shipping.name, isAsc);
        case 'date': return compare(a.datePlaced, b.datePlaced, isAsc);
        default: return 0;
      }
    });
    return;
  }

  filterOrder() {
    this.orderClass = true;
    this.completedClass = false;
    this.processingClass = false;
    this.filteredOrders = this.orders$.filter(val => {
      if (val.status === 'ordered') {
        return true;
      }
      return false;
    });
  }

  filterProcessing() {
    this.orderClass = false;
    this.completedClass = false;
    this.processingClass = true;
    this.filteredOrders = this.orders$.filter(val => {
      if (val.status === 'processing') {
        return true;
      }
      return false;
    });
  }

  filterCompleted() {
    this.orderClass = false;
    this.completedClass = true;
    this.processingClass = false;
    this.filteredOrders = this.orders$.filter(val => {
      if (val.status === 'completed') {
        return true;
      }
      return false;
    });

    this.filteredOrders = this.filteredOrders.reverse();
  }

  changeTo(key, status) {
    this.orderService.changeTo(key, status)
    alert(`Order No ${key} is now in ${status}`)
  }

  searched() {
    this.filteredOrders = this.orders$.filter(val => {
      const k: string = val.$key;
      if (k.toLowerCase().search(this.search.toLowerCase()) > -1) {
        return true;
      } else {
        return false;
      }
    });
  }
}


/**
 * It is used to compare two numbers or strings.
 * @param a Any Number or String for Comparison Right hand side.
 * @param b Any Number or String for Comparison Left hand side.
 * @param isAsc To check if the comparison is Ascending or not.
 */
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}