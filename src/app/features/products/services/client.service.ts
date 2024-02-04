// import { Injectable } from '@angular/core';
// import { Client } from '../models/client.model';
// import { BehaviorSubject, tap } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { ClientResponse } from '../models/clients.response';
// import { environment } from 'src/app/environments/environments.prod';

// @Injectable({
//   providedIn: 'root'
// })
// export class ClientService {
//   private clients = new BehaviorSubject<Client[] | null>(null);
//   clients$ = this.clients.asObservable();

//   constructor(
//     private http: HttpClient,
//   ) { }

//   getClients() {
//     return this.http.get<ClientResponse>(`${environment.url_api}/api/clientes`)
//       .pipe(
//         tap(
//           response => this.clients.next(response.clients)
//         )
//       )
//   }
// }
