import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../models/auth.model';
import { environment } from 'src/app/environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  private auth = new BehaviorSubject<Auth | null>(null);
  auth$ = this.auth.asObservable();
  
  constructor(
    private http: HttpClient, 
    private tokenService: TokenService
  ) {}

  login(username: string, password: string) {
    return this.http
      .post<User>(`${environment.url_api}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap(
          (response) => this.tokenService.saveToken(response.token),
        ),
        tap(
          (response) => this.auth.next(response)
        )
      );
  }

  hasToken(){
    return this.tokenService.getToken() !== null;
  }

  isAuthenticated(){
    const token = this.tokenService.getToken();
    if (token) {
      this.auth.next({token});
    }
  }

  logOut(){
    this.tokenService.removeToken();
    this.auth.next(null);
  }
}
