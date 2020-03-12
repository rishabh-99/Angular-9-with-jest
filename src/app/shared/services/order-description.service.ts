import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderDescriptionService {

  constructor(private db: AngularFireDatabase) { }

  getOrder(orderId) {
    return this.db.list('/orders/' + orderId).snapshotChanges();
  }
}
