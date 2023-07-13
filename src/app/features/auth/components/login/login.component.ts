import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
  ){
    this.buildForm();
  }

  private buildForm(){
    this.myForm = this.fb.group({
      username: [ '', Validators.required ],
      password:  [ '',
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ]
    });
  }

  ngOnInit(): void {
  }

  get usernameField(){
    return this.myForm.get('username');
  }

  setUsernameField(username : string){
    this.myForm.setValue({'username': username});
  }

  get passwordField(){
    return this.myForm.get('password');
  }

  setPasswordField(password : string){
    this.myForm.setValue({'password': password});
  }

  login() : void{
    if (this.myForm.valid) {
      this.authService.login(
        this.usernameField?.value,
        this.passwordField?.value,
      ).subscribe(res => {
        this.router.navigate(['admin']);
      });
    }
  }

  autologin() : void{
    this.authService.login(
      'atuny0',
      '9uQFF1Lh',
    ).subscribe(res => {
      this.router.navigate(['admin']);
      });
  }
}
