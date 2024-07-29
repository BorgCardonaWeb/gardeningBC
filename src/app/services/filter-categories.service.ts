import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { categoriesKeyStorage, productsKeyStorage } from '../../assets/emuns/const';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../enviroment/environment.prod';

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
  private userLoginDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public data$: Observable<any[]> = this.dataSubject.asObservable();
  public dataModal$: Observable<boolean> = this.dataModalSubject.asObservable();
  public dataCartProducts$: Observable<any[]> = this.dataCartProductsSubject.asObservable();
  public dataSearcher$: Observable<string> = this.searcherSubject.asObservable();
  public dataSearcherParam$: Observable<string> = this.searcherParamSubject.asObservable();
  public dataSearcherCategorie$: Observable<string> = this.searcherCategorie.asObservable();
  public userLoginDataSubject$: Observable<any[]> = this.userLoginDataSubject.asObservable();

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) { }

  apiUrl = `${environment.apiUrl}`;

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories`);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products`);
  }

  getProductsBySubcategory(subcategoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/subcategory/${subcategoryId}`);
  }

  getCountryCodes(): Observable<any[]> {
    return this.http.get<any[]>('/assets/data/country-codes.json');
  }

  getProductsByFilter(filter: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/products/filterParam`, { filter });
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

  updateUserLoginData(data: any[]): void {
    this.userLoginDataSubject.next(data);
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



  getDataByStorage(key: string, updateData = false) {
    const storage = this.localStorageService.getItem(key);
    if (storage) {
      if (updateData) {
        this.updateData(JSON.parse(storage));
      }
      return JSON.parse(storage);
    } else {
      return undefined;
    }
  }

  clearStorage() {
    this.localStorageService.clear();
  }


  setDataStorage(key: string, data: any) {
    const storage = this.localStorageService.getItem(key);
    this.localStorageService.setItem(productsKeyStorage, JSON.stringify(data));
    if (storage) {
      this.localStorageService.removeItem(productsKeyStorage);
      this.localStorageService.setItem(productsKeyStorage, JSON.stringify(data));
    } else {
      this.localStorageService.setItem(productsKeyStorage, JSON.stringify(data));
    }

  }


}
