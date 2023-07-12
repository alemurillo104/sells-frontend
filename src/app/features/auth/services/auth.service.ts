import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  ngOnInit(): void {}

  getCurrentUser(){
    const token = this.tokenService.getToken();
    if (token) {
      this.getProfile();
      // this.getProfile().suscribe();
    }
  }

  login(username: string, password: string) {
    return this.http
      .post<User>('https://dummyjson.com/auth/login', {
        username,
        password,
        // username: 'atuny0',
        // password: '9uQFF1Lh',
      })
      .pipe(
        tap(
          (response) => this.tokenService.saveToken(response.token),
        ),
      );
    // })
    // .subscribe((res) => {
    //   this.user = res;
    //   console.log(res);
    // });
  }

  getProfile(){
    // return this.http.get()
  }

  logOut(){
    this.tokenService.removeToken();
    this.user.next(null);
  }

}
