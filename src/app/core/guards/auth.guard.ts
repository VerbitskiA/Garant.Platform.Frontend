import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtService: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.warn('!!!!!! AuthGuard isTokenExpired', this.jwtService.isTokenExpired())
    // console.warn('!!!!!! AuthGuard isTokenExpired', this.jwtService.decodeToken(this.jwtService.tokenGetter()))
    const parsedToken = this.jwtService.tokenGetter();
    if (state.url.includes('login')){
      if (parsedToken){
        this.router.navigate(['/']);
        return true;
      }else {
        return true;
      }
    }else {
      return !!parsedToken;
    }
    // if (this.jwtService.isTokenExpired()) {
    //   this.router.navigate(['']);
    //   return false;
    // } else {
    //   return true;
    // }
  }

}
