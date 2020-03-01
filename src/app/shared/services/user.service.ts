import { AppUser } from '../models/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import 'firebase/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}
