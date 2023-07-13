import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [ LoginGuard ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./../admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
