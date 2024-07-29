import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Observable, Subscription } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { productsKeyStorage, productsToCartKeyStorage } from '../../../../assets/emuns/const';
import { product } from '../../models/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  idCategorie: string = "";
  idSubCategorie: string = "";
  products: product[] = [];


  dataSearcherParam$: Observable<any> | undefined;
  dataSearcherCategorie$: Observable<any> | undefined;
  dataSearcherCategorieSubscription: Subscription | undefined;
  dataSearcherFilterSubscription: Subscription | undefined;

  get showProducts() {
    return this.products?.length > 0;
  }

  constructor(private categoriesService: FilterCategoriesService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getProductsBycategorie();
    this.getProductsByParam();
  }

  getProductsBycategorie() {
    if (this.dataSearcherCategorieSubscription) {
      this.dataSearcherCategorieSubscription.unsubscribe();
    }

    this.dataSearcherCategorie$ = this.categoriesService.dataSearcherCategorie$;
    this.dataSearcherCategorieSubscription = this.dataSearcherCategorie$.pipe(take(1)).subscribe(_data => {
      if(_data !== ""){
        this.idCategorie = _data[0].id;
        this.idSubCategorie = _data[1].id;

        this.categoriesService.getProductsBySubcategory(String(this.idSubCategorie)).subscribe(
          data=>{
            this.products = data;
            console.log(this.products)
          }
        )
      }
    });
  }

  getProductsByParam() {
   
    if (this.dataSearcherFilterSubscription) {
      this.dataSearcherFilterSubscription.unsubscribe();
    }

    this.dataSearcherParam$ = this.categoriesService.dataSearcherParam$;
    this.dataSearcherFilterSubscription = this.dataSearcherParam$.subscribe(_data => {
      if (_data !== "") {
       /* debugger
        let arraySKU = this.products.filter( dataFilter => { String(dataFilter.name).includes(_data)});
        console.log(arraySKU)*/
        this.categoriesService.getProductsByFilter(_data).pipe(take(1)).subscribe(
          data=>{
            this.products = data;
          }
        )   
      }
    });
  }

  addToCart(index: number, product: product) {
    this.products[index].isLoading = true;
    this.products[index].quantities = 1;
    this.products[index].originalValue = Number(this.products[index].value)
    
    const storage = this.localStorageService.getItem(productsToCartKeyStorage);
    let arrayData: product[] = [];

    if (storage) {
      try {
        arrayData = JSON.parse(storage);
        if (!Array.isArray(arrayData)) {
          arrayData = [];
        }
      } catch (e) {
        console.error('Error parsing storage data:', e);
        arrayData = [];
      }
    }

    arrayData.push(product);
    arrayData = this.cleanArray(arrayData);
    this.localStorageService.setItem(productsToCartKeyStorage, JSON.stringify(arrayData));


    let testdata: any = this.localStorageService.getItem(productsToCartKeyStorage)
    this.categoriesService.updateCartProducts(JSON.parse(testdata));
    

    setTimeout(() => {
      this.products[index].isLoading = false;
    }, 100);
  }

  cleanArray(array: product[]): product[] {
    const productMap = new Map<string, product>();

    array.forEach((product: product) => {
      productMap.set(product.id, product);
    });

    return Array.from(productMap.values());
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
}
