import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { CreateClientComponent } from './components/create-client/create-client.component';

const routes: Routes = [
  {
    path: 'list',
    component: ClientsListComponent,
  },
  {
    path: 'create',
    component: CreateClientComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
