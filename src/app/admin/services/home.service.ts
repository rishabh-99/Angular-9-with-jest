import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private db: AngularFireDatabase) { }

  save(imageUrl) {
    let a =this.db.database.ref(`/home`).update({ imageUrl: imageUrl })
    console.log(a)
  }

  getEverything() {
    return this.db.object('/home').snapshotChanges();
  }

  getUrls() {
    return this.db.list('/home/imageUrl').snapshotChanges();
  }

  // updateUrls(imageUrl)
}
