import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import 'firebase/database';

import { Injectable } from '@angular/core';

@Injectable()
export class BrandService {

  constructor(private db: AngularFireDatabase) { }

  getFor(main,categoryName) {
    return this.db.list(`/mainCategories/${main}/categories/${categoryName}/brands`).snapshotChanges();
  }
}
