import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories');
  }
  getll() {
    return this.db.database.ref('/categories');
  }
  getl(main) {
    return this.db.list(`/mainCategories/${main}`).snapshotChanges()
  }

  getA() {
    return this.db.list('/categories').snapshotChanges();
  }
  getMainCategories() {
    return this.db.list('/mainCategories').snapshotChanges();
  }
  getHeading(main) {
    return this.db.list(`/mainCategories/${main}`).snapshotChanges();
  }

  addMain(category, desc) {
    return this.db.database.ref(`/mainCategories/`).child(category).set({ name: category, desc })
  }

  removeMain(category) {
    return this.db.database.ref(`/mainCategories/${category}`).remove();
  }

  addCat(main, cat) {
    return this.db.database.ref(`/mainCategories/${main}/categories`).child(cat).set({ name: cat })
  }

  removeCat(main, cat) {
    return this.db.database.ref(`/mainCategories/${main}/categories/${cat}`).remove();
  }

  addBrand(main, cat, brand) {
    return this.db.database.ref(`/mainCategories/${main}/categories/${cat}/brands`).child(brand).set({ name: brand })
  }

  removeBrand(main, cat, brand) {
    return this.db.database.ref(`/mainCategories/${main}/categories/${cat}/brands/${brand}`).remove();
  }

  addPincode(pincode) {
    // return this.db.list('/pincode').push(pincode)
    return this.db.database.ref('/pincode').child(pincode).set(pincode);
  }

  remPin(pincode) {
    return this.db.database.ref(`/pincode/${pincode}`).remove();
  }

  fetchAll() {
    return this.db.list('/pincode').snapshotChanges();
  }

  modifyPin(pincodes) {
    this.db.database.ref('/pincode').remove().then(() => {
      for (const p of pincodes) {
        this.db.database.ref('/pincode').child(p.name).set(p.name);
      }
    });
  }
}
