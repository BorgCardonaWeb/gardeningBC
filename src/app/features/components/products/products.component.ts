import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { productsToCartKeyStorage } from '../../../../assets/emuns/const';
import { product } from '../../models/models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe, LocalStorageService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  idCategorie: string = "";
  idSubCategorie: string = "";
  products: any;

  dataSearcherParam$: Observable<any> | undefined;
  dataSearcherCategorie$: Observable<any> | undefined;

  get showProducts() {
    return this.products?.length > 0;
  }

  constructor(private categoriesService: FilterCategoriesService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.products = this.categoriesService.getProductsByStorage();
    this.getProductsBycategorie();
    this.getProductsByParam();
  }

  getProductsBycategorie() {
    this.dataSearcherCategorie$ = this.categoriesService.dataSearcherCategorie$;
    this.dataSearcherCategorie$.subscribe(_data => {
      if (_data !== "") {
        this.idCategorie = _data[0].id;
        this.idSubCategorie = _data[1].id;
        this.products = this.categoriesService.getProductsByStorage();
        this.products = this.products.filter((data: any) =>
          data.categoriID == this.idCategorie &&
          data.subcategoriID == this.idSubCategorie
        );
      }
    });
  }

  getProductsByParam() {
    this.dataSearcherParam$ = this.categoriesService.dataSearcherParam$;
    this.dataSearcherParam$.subscribe(_data => {
      if (this.idCategorie == "" && this.idSubCategorie == "") {
        this.products = this.categoriesService.getProductsByStorage();
      }
      if (_data !== "") {
        this.products = this.categoriesService.getProductsByStorage();
        this.products = this.products.filter((data: any) => {
          return (String(data.name).toLocaleLowerCase().includes(_data.toLocaleLowerCase()) ||
            String(data.SKU).toLocaleLowerCase().includes(_data.toLocaleLowerCase()))
        });
      }
    });
  }

  addToCart(index: number, product: product) {
    this.products[index].isLoading = true;

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
    this.products[index].isLoading = false;

    let testdata: any = this.localStorageService.getItem(productsToCartKeyStorage)
    this.categoriesService.updateCounter(JSON.parse(testdata));
  }

  cleanArray(array: product[]): product[] {
    const productMap = new Map<string, product>();

    array.forEach((product: product) => {
      productMap.set(product.id, product);
    });

    return Array.from(productMap.values());
  }
}
