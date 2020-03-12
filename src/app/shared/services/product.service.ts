import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product): firebase.database.ThenableReference { 
    console.log(product)
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  getEverything() {
    return this.db.list('/products').snapshotChanges();
  }
  
  get(productId) { 
    return this.db.object('/products/' + productId).snapshotChanges()
  }

  update(productId, product) { 
    console.log(product)
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) { 
    return this.db.object('/products/' + productId).remove();
  }
}
