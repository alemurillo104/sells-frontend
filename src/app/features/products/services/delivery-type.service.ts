import { Injectable } from '@angular/core';
import { DeliveryType } from '../models/delivery_type.model';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environments.prod';
import { DeliveryTypeResponse } from '../models/delivery_type.response.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryTypeService {

  private deliveryTypes = new BehaviorSubject<DeliveryType[] | null>(null);
  deliveryTypes$ = this.deliveryTypes.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getDeliveryTypes() {
    return this.http.get<DeliveryType[]>(`${environment.url_api}/api/tipoPagos`)
      .pipe(
        tap(
          response => this.deliveryTypes.next(response),
        )
      );
  }
}
