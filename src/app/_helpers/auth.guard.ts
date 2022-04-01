import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthenticationService) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('myToken')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
