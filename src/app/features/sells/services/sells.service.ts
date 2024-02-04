import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sell } from '../models/sell.model';
import { BehaviorSubject, tap } from 'rxjs';
import { SellRequest } from '../models/sell.request.model';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SellsService {

  private sells = new BehaviorSubject<Sell[] | null>(null);
  sells$ = this.sells.asObservable();

  private sell = new BehaviorSubject<Sell | null>(null);
  sell$ = this.sell.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  saveSell(sellData: SellRequest) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${environment.url_api}/api/ventas`, JSON.stringify(sellData), { headers: headers })
      .pipe(
        tap(
          response => console.log(response)
        )
      )

  }

  getSells(){
    return this.http.get<Sell[]>(`${environment.url_api}/api/ventas`)
    .pipe(
      tap(
        response => this.sells.next(response)
      )
    )
  }

}
