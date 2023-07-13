import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/features/auth/models/auth.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'admin-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  auth: Auth | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.authService.auth$
    .subscribe(
      res => {
        console.log(res);
        this.auth = res;
      }
    );
  }

  logOut(){
   this.authService.logOut();
   this.auth = null;
   this.router.navigate(['/landing']);
  }
}
