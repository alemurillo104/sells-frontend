import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent {

  clientsList: Client[] = [];
  constructor(
    private service: ClientService
  ) {

    this.service.getClients().subscribe(
      res => this.clientsList = res
    )
  }
}
