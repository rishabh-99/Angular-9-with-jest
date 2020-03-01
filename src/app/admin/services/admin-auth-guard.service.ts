import { Observable } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/app-user';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map((appUser: AppUser) => appUser.isAdmin));
  }
}
