import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  providers: [LocalStorageService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  idCategorie: string = "";
  idSubCategorie: string = "";
  products: any;

  dataSearcherParam$: Observable<any> | undefined;
  dataSearcherCategorie$: Observable<any> | undefined;

  get showProducts() {
    if (this.products?.length > 0) {
      return true;
    } else {
      return false
    }
  }


  constructor(private categoriesService: FilterCategoriesService) {

  }

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
      if(this.idCategorie == "" && this.idSubCategorie == ""){
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



}
