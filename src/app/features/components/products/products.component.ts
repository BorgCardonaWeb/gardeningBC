import { Component, DebugElement, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Observable, Subscription } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { productsKeyStorage, productsToCartKeyStorage } from '../../../../assets/emuns/const';
import { product } from '../../models/models';
import { take } from 'rxjs/operators';
import { ProductsServicesService } from '../../../services/products-services.service';
import { Title } from '@angular/platform-browser';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';

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
  productModal = 7;
  products: product[] = [];
  error = false


  dataSearcherParam$: Observable<any> | undefined;
  dataSearcherCategorie$: Observable<any> | undefined;
  dataSearcherCategorieSubscription: Subscription | undefined;
  dataSearcherFilterSubscription: Subscription | undefined;

  get showProducts() {
    return this.products?.length > 0;
  }

  constructor(private categoriesService: FilterCategoriesService,
    private localStorageService: LocalStorageService,
    private generalInfoServiceService: GeneralInfoServiceService,
    private productsServicesService: ProductsServicesService) { }

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
      if (_data !== "") {
        this.idCategorie = _data[0].id;
        this.idSubCategorie = _data[1].id;

        this.categoriesService.getProductsBySubcategory(String(this.idSubCategorie)).subscribe(
          data => {
            this.products = data;
            this.getProductDetails(data)
          },
          () => {
            this.showErrorAlert()
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

        this.categoriesService.getProductsByFilter(_data).pipe(take(1)).subscribe(
          (data: any) => {
            this.products = data;
            this.getProductDetails(data);
          },
          () => {
            this.showErrorAlert()
          }
        )
      }
    });
  }

  getProductDetails(data: any) {
    for (let product of this.products) {
      product.loadindData = true;
    }

    let skuArray: string[] = [];

    data.forEach((element: any) => {
      skuArray.push(element.sku);
    });

    const chunkedSkuArrays = this.chunkArray(skuArray, 5);

    const processChunk = (chunk: string[]) => {
      return new Promise<void>((resolve) => {
        this.productsServicesService.getProductsBySKUArray(chunk).subscribe(
          productsData => {
            productsData.forEach((dataItem) => {
              this.addValueAndStockToProducts(dataItem);
            });
            resolve();
          },
          () => {
            this.showErrorAlert();
            resolve();
          }
        );
      });
    };
    (async () => {
      for (const chunk of chunkedSkuArrays) {
        await processChunk(chunk);
      }
    })();
  }

  addValueAndStockToProducts(dataItem: any) {
    const matchingProduct = this.products.find(product => product.sku.trim() === dataItem.StockCode.trim());
    if (matchingProduct) {
      matchingProduct.value = dataItem.Selling2IncVAT;
      matchingProduct.stockQuantity = dataItem.Quantity;
      matchingProduct.loadindData = false;
    }
  }

  chunkArray(array: string[], chunkSize: number): string[][] {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  }


  showErrorAlert() {
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
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

  cleanArray(array: any) {
    const productMap = new Map<string, any>();

    array.forEach((product: any) => {
      productMap.set(product.productID, product);
    });

    return Array.from(productMap.values());
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  openModal(product: any) {
    this.generalInfoServiceService.openModal(this.productModal, product.name, product.shortDescription, product.description);
  }
}
