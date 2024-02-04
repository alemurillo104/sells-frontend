import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSellFormComponent } from './components/create-sell-form/create-sell-form.component';
import { SellsListComponent } from './components/sells-list/sells-list.component';

const routes: Routes = [
  {
    path: '',
    component: SellsListComponent,
  },
  {
    path: 'create',
    component: CreateSellFormComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellsRoutingModule { }
