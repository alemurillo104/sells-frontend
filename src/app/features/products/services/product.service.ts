import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { BehaviorSubject, tap } from 'rxjs';
import { ProductResponse } from '../models/product.response.model';
import { environment } from 'src/app/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products = new BehaviorSubject<Product[] | null>(null);
  products$ = this.products.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  getAll(){
    return this.http.get<ProductResponse>(`${environment.url_api}/products`)
    .pipe(
      tap(
        (response) => this.products.next(response.products)
      )
    )
  }
}
