import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Client } from '../models/client.model';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients = new BehaviorSubject<Client[] | null>(null);
  clients$ = this.clients.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getClients() {
    return this.http.get<Client[]>(`${environment.url_api}/api/clientes`)
      .pipe(
        tap(
          response => this.clients.next(response)
        )
      )
  }

  createClient(client: Client) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${environment.url_api}/api/clientes`, JSON.stringify(client), { headers: headers })
      .pipe(
        tap(
          response => console.log(response)
        )
      )
  }

}
