import { Injectable } from '@angular/core';
import { Store } from '../models/store.model';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoresResponse } from '../models/stores.response.model';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private stores = new BehaviorSubject<Store[] | null>(null);
  stores$ = this.stores.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getStores() {
    return this.http.get<Store[]>(`${environment.url_api}/api/almacenes`)
      .pipe(
        tap(
          response => this.stores.next(response),
        )
      );
  }
}
