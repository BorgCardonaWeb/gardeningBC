import { Component } from '@angular/core';
import { product } from '../../models/models';
import { productsToCartKeyStorage } from '../../../../assets/emuns/const';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe, LocalStorageService],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  get showAlert() {
    return this.products?.length < 1;
  }


  products: product[] = [];

  constructor(private categoriesService: FilterCategoriesService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getShoppingCartData();
  }

  getShoppingCartData() {
    let storage = this.localStorageService.getItem(productsToCartKeyStorage);
    if (storage) {
      this.products = JSON.parse(storage)
    }
  }

  removeItemStorage(index: number) {
    this.products.splice(index, 1);
    this.localStorageService.updateItem(productsToCartKeyStorage, JSON.stringify(this.products));
    this.categoriesService.updateCartProducts(this.products);
  }

  addCounterProduct(index: number) {
    this.products[index].quantities = this.products[index].quantities + 1;
    this.products[index].value = String(Number(this.products[index].value) + this.products[index].originalValue);
    this.localStorageService.updateItem(productsToCartKeyStorage, JSON.stringify(this.products));
  }

  deleteCounterProduct(index: number) {
    if (this.products[index].quantities > 1) {
      this.products[index].quantities = this.products[index].quantities - 1;
      this.products[index].value = String(Number(this.products[index].value) - this.products[index].originalValue);
      this.localStorageService.updateItem(productsToCartKeyStorage, JSON.stringify(this.products));
    }
  }

 

}
