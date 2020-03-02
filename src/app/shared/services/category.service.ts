import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() { 
    return this.db.list('/categories');
  }

  getA() {
    return this.db.database.ref('/categories').once('value');
  }
}
