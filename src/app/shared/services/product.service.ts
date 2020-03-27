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

  updateRating(productKey, rating) {
    return this.db.database.ref(`/products/${productKey}`).once('value', data => {
      let rat = data.val().rating
      let newRating;
      if (rat === 0) {
        newRating = rating;
      } else {
        newRating = Math.ceil((rat + rating) / 2);
      }
      this.db.database.ref(`/products/${productKey}`).update({ rating: newRating });
    });
  }
}
