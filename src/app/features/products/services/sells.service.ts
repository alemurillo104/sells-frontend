import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Sell } from '../models/sell.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environments.prod';
import { SellRequest } from '../models/sell.request.model';

@Injectable({
  providedIn: 'root'
})
export class SellsService {

  private sell = new BehaviorSubject<Sell | null>(null);
  sell$ = this.sell.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  saveSell(sellData: SellRequest) {
    console.log("sellData", sellData);
    const data = JSON.stringify(sellData);
    const url = `${environment.url_api}/products/add`;
    console.log("data", data);
    // return this.http.post<Sell>(url, data)
    //   .pipe(
    //     tap(
    //       (response) => this.sell.next(response)
    //     )
    //   );
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'BMW Pencil',
        /* other product data */
      })
    })
      .then(res => res.json())
      .then(console.log);

  }

}
