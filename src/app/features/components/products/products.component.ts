import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Input() paramSearcher: string = "";

  idCategorie: string = "";
  idSubCategorie: string = "";
  products: any;

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
    this.getAllProducts();
  }


  getAllProducts() {

    this.products = this.categoriesService.getProductsByStorage();
    this.getProducts();
  }

  getProducts() {
    if (this.categoriesData.length > 1) {
      this.getIDCategories();
    }
    this.filterProducts();
  }

  getIDCategories() {
    this.idCategorie = this.categoriesData[0].id;
    this.idSubCategorie = this.categoriesData[1].id;
  }

  filterProducts() {
    console.log("Los productos actuales son")
    console.log(this.products)
    if (this.idCategorie !== "" && this.idSubCategorie !== "") {
      console.log("Se va a filtrar por categorya y subcategoria", this.idCategorie, this.idSubCategorie)
      this.products = this.products.filter((data: any) =>
        data.categoriID == this.idCategorie &&
        data.subcategoriID == this.idSubCategorie
      );

      console.log("los productos despues de ser filtrados por categoria", this.products)
    }

    if (this.paramSearcher !== "") {
      console.log("filtro por nombre o barcode", this.paramSearcher)
      this.products = this.products.filter((data: any) => {
        return (String(data.name).toLocaleLowerCase().includes(this.paramSearcher.toLocaleLowerCase()) ||
          String(data.SKU).toLocaleLowerCase().includes(this.paramSearcher.toLocaleLowerCase()))
      });

      console.log("los productos despues de ser filtrados por parametro", this.products)
      
    }
    this.categoriesService.updateData(this.products);
  }  

}
