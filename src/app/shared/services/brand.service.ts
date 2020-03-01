import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import 'firebase/database';

import { Injectable } from '@angular/core';

@Injectable()
export class BrandService {

  constructor(private db: AngularFireDatabase) { }

  getFor(categoryName) {
    console.log(categoryName)
    return this.db.list(`/categories/${categoryName}/brands`).valueChanges();
  }
}
