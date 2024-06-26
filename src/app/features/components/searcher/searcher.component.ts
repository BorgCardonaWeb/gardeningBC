import { Component, EventEmitter, Output, effect, signal } from '@angular/core';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent {

  productsData: any;
  showSearcherBoxError = false;
  showSearcherBox = false;
  searcherProduct = signal('');
  data$: Observable<any[]> | undefined;
  dataSearcher$: Observable<string> | undefined;
  @Output() nameProductSearched = new EventEmitter<any>();

  constructor(private categoriesService: FilterCategoriesService) {
    this.getProducts();
    this.clearSearcher();
    effect(() => { this.filterProductProsses(); })
  }

  filterProductProsses() {

    if (this.searcherProduct().length > 0) {
      this.filterProductBySearchingControl();
      this.showOrHideNoProductsMessagges();
      this.showSearcherBox = true;
    } else {
      this.showSearcherBox = false;
      this.productsData = this.categoriesService.getProductsByStorage();
    }
  }

  showOrHideNoProductsMessagges() {
    if (this.productsData.length > 0) {
      this.showSearcherBoxError = false;
    } else {
      this.showSearcherBoxError = true;
    }
  }

  filterProductBySearchingControl() {
    this.productsData = this.productsData.filter((data: any) => {
      return (String(data.name).toLocaleLowerCase().includes(this.searcherProduct().toLocaleLowerCase()) ||
        String(data.SKU).toLocaleLowerCase().includes(this.searcherProduct().toLocaleLowerCase()))
    });
  }

  selectProductForSearching(nameProductSelected: string) {
    this.showSearcherBox = false;
    this.showSearcherBoxError = false;
    this.searcherProduct.set(nameProductSelected);
  }

  getProducts() {
    this.data$ = this.categoriesService.data$;
    this.data$.subscribe(data => {
      this.productsData = data;
    });
  }

  clearSearcher() {
    this.dataSearcher$ = this.categoriesService.dataSearcher$;
    this.dataSearcher$.subscribe(data => {
      this.searcherProduct.set("");
      this.productsData = this.categoriesService.getProductsByStorage();
    });
    
  }

  emmitSearching() {
    this.showSearcherBox = false;
    this.showSearcherBoxError = false;
    this.nameProductSearched.emit(this.searcherProduct());
  }

}
