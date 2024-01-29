import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSellFormComponent } from './components/create-sell-form/create-sell-form.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: CreateSellFormComponent,
  // },
  {
    path: 'create',
    component: CreateSellFormComponent,
  },
  {
    path: '**',
    redirectTo: 'create',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellsRoutingModule { }
