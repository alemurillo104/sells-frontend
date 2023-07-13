import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})

export class LoginGuard{
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Autenticado: ', this.authService.auth$)
    this.authService.auth$
    .subscribe(
      res => {
        if (res !== null) {
            this.router.navigate(['/landing']);
            return false;
        }
        return true;
      }
    );
    return true;
  }
}