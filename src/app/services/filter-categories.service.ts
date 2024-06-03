import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterCategoriesService {
  
  objectProductFilter: Subject<any> = new Subject<any>();

  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public data$: Observable<any[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>('/assets/data/categories.json');
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>('/assets/data/products.json');
  }

  getSetProductsForSearching(data: any[]): void {
    this.dataSubject.next(data);
  }
  updateData(data: any[]): void {
    this.dataSubject.next(data);
  };
}
