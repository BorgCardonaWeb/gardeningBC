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
  private dataModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private dataCartProductsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private searcherSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private searcherParamSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private searcherCategorie: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private dataSuccess: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  
  public data$: Observable<any[]> = this.dataSubject.asObservable();
  public dataModal$: Observable<boolean> = this.dataModalSubject.asObservable();
  public dataCartProducts$: Observable<any[]> = this.dataCartProductsSubject.asObservable();
  public dataSearcher$: Observable<string> = this.searcherSubject.asObservable();
  public dataSearcherParam$: Observable<string> = this.searcherParamSubject.asObservable();
  public dataSearcherCategorie$: Observable<string> = this.searcherCategorie.asObservable();
  public dataSuccess$: Observable<boolean> = this.dataSuccess.asObservable();

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) { }

  getCategories(): Observable<any> {
    return this.http.get<any>('/assets/data/categories.json');
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>('/assets/data/products.json');
  }

  getCountryCodes(): Observable<any[]> {
    return this.http.get<any[]>('/assets/data/country-codes.json');
  }

  updateModal(data: boolean): void {
    this.dataModalSubject.next(data);
  };

  updateData(data: any[]): void {
    this.dataSubject.next(data);
  };

  updateCartProducts(data: any[]): void {
    this.dataCartProductsSubject.next(data);
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

  sendSuccess(data: boolean): void {
    this.dataSuccess.next(data);
  };

  getDataByStorage(key: string, updateData = false, ) {
    const storage = this.localStorageService.getItem(key);
    if (storage) {
      if (updateData) {
        this.updateData(JSON.parse(storage));
      }
      return JSON.parse(storage);
    } else{
      return undefined;
    }
  }
  

  clearStorage(){
    this.localStorageService.removeItem(categoriesKeyStorage);
    this.localStorageService.removeItem(productsKeyStorage);
  }



}
