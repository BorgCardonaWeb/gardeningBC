import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsServicesService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiUrl}`;

  getProductsBySKUArray(stockCodes: string[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/stock/getStockDetails`, { stockCodes });
  }

  getProductsByIds(productIds: number[]): Observable<any> {
    const url = `${this.apiUrl}/products/byIds`;
    return this.http.post(url, { productIds });
  }

  getAllBannerImages(): Observable<any> {
    const url = `${this.apiUrl}/products/allBannerImages`;
    return this.http.get(url);
  }

}
