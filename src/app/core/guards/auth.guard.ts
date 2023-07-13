import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Auth Guard Admin Autenticado: ', this.authService.auth$)
      this.authService.auth$
    .subscribe(
      res => {
        if (res === null) {
            this.router.navigate(['/home']);
            return false;
        }
        return true;
      }
    );
    return true;
  }
}