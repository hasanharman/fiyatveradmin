import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthorityGuardService implements CanActivate{
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authority = JSON.parse(localStorage.getItem('currentUser')).admin.authority;
    console.log(authority, state.url)
    if (authority && authority.indexOf(state.url) !== -1) {
      // logged in so return true
      console.log("selam")
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home']);
    return false;
  }
}
