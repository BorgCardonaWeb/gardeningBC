import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiUrl}`;

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orders/create`, orderData);
  }

  getOrdersByClientId(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/client/${clientId}`);
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/order/${orderId}`);
  }

}
