import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<unknown> {
    return this.user$.pipe(switchMap((user: any) => {
      if (user) {
        return this.userService.get(user.uid);
      }
      return of(null);
    }));

  }
}
