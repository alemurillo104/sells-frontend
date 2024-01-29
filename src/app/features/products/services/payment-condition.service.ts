import { Injectable } from '@angular/core';
import { PaymentCondition } from '../models/payment_condition.model';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaymentConditionResponse } from '../models/payment_condition.response.model';
import { environment } from 'src/app/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class PaymentConditionService {

  private paymentConditions = new BehaviorSubject<PaymentCondition[] | null>(null);
  paymentConditions$ = this.paymentConditions.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getPaymentConditions() {
    return this.http.get<PaymentConditionResponse>(`${environment.url_api}/api/tiposEntregas`)
      .pipe(
        tap(
          response => this.paymentConditions.next(response.paymentConditions)
        )
      )
  }
}