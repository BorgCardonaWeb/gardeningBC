import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { categoriesKeyStorage, productsKeyStorage } from '../../assets/emuns/const';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FilterCategoriesService {

  objectProductFilter: Subject<any> = new Subject<any>();

  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private searcherSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private searcherParamSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private searcherCategorie: BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  public data$: Observable<any[]> = this.dataSubject.asObservable();
  public dataSearcher$: Observable<string> = this.searcherSubject.asObservable();
  public dataSearcherParam$: Observable<string> = this.searcherParamSubject.asObservable();
  public dataSearcherCategorie$: Observable<string> = this.searcherCategorie.asObservable();

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) { }

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

  updateSearcher(data: ""): void {
    this.searcherSubject.next(data);
  };

  updateParamSearcher(data: ""): void {
    this.searcherParamSubject.next(data);
  };

  updateCategorieSearcher(data: ""): void {
    this.searcherCategorie.next(data);
  };


  getProductsByStorage(updateData = false) {
    const storage = this.localStorageService.getItem(productsKeyStorage);
    if (storage) {
      if (updateData) {
        this.updateData(JSON.parse(storage));
      }
      return JSON.parse(storage);
    }
  }

  clearStorage(){
    this.localStorageService.removeItem(categoriesKeyStorage);
    this.localStorageService.removeItem(productsKeyStorage);
  }



}
