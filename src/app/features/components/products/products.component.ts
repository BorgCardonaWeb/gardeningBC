import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { productsKeyStorage } from '../../../../assets/emuns/const';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FilterCategoriesService } from '../../../services/filter-categories.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  providers: [LocalStorageService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  @Input() categoriesData: any = [];
  idCategorie: string = "";
  idSubCategorie: string = "";
  products: any;
  productsFilter: [] = [];

  get showProducts() {
    if (this.productsFilter.length > 0) {
      return true;
    } else {
      return false
    }
  }


  constructor(private localStorageService: LocalStorageService, private categoriesService: FilterCategoriesService) {
  }

  ngOnInit(): void {
    this.getIDCategories();
    this.getProducts();
  }

  getProducts() {
    this.categoriesService.getAllProducts().subscribe(data => {
      this.products = data;
      this.categoriesService.updateData(data);
      this.getProductByCategorieAndSubCategorie();
    });
  }

  getIDCategories() {
    this.idCategorie = this.categoriesData[0].id;
    this.idSubCategorie = this.categoriesData[1].id;
  }

  getProductByCategorieAndSubCategorie() {
    this.productsFilter = this.products.filter((data: any) => data.categoriID == this.idCategorie && data.subcategoriID == this.idSubCategorie);
    this.categoriesService.updateData(this.productsFilter);
  }



}
