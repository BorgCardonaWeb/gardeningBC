import { Component } from '@angular/core';
import { product } from '../../models/models';
import { productsToCartKeyStorage, purchaseTotalkeystorage } from '../../../../assets/emuns/const';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { userSession } from '../../../../assets/emuns/generalEnums';
import { UserManagementService } from '../../../services/user-management.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  get showAlert() {
    return this.products?.length < 1;
  }

  total = 0;
  typeAction = 5;
  userData: any;

  products: product[] = [];

  constructor(private categoriesService: FilterCategoriesService,
    private localStorageService: LocalStorageService,
    private generalInfoServiceService: GeneralInfoServiceService,
    private userManagementService: UserManagementService,
    private router: Router) { }

  ngOnInit(): void {
    this.getShoppingCartData();
  }

  getShoppingCartData() {
    let storage = this.localStorageService.getItem(productsToCartKeyStorage);
    if (storage) {
      this.products = JSON.parse(storage);
      this.getTotal();
    }
  }

  removeItemStorage(index: number) {
    this.products.splice(index, 1);
    this.localStorageService.updateItem(productsToCartKeyStorage, JSON.stringify(this.products));
    this.categoriesService.updateCartProducts(this.products);
    this.getTotal();
  }

  addCounterProduct(index: number) {
    this.products[index].quantities = this.products[index].quantities + 1;
    this.products[index].value = String(Number(this.products[index].value) + this.products[index].originalValue);
    this.localStorageService.updateItem(productsToCartKeyStorage, JSON.stringify(this.products));
    this.getTotal();
  }

  deleteCounterProduct(index: number) {
    if (this.products[index].quantities > 1) {
      this.products[index].quantities = this.products[index].quantities - 1;
      this.products[index].value = String(Number(this.products[index].value) - this.products[index].originalValue);
      this.localStorageService.updateItem(productsToCartKeyStorage, JSON.stringify(this.products));
      this.getTotal();
    }
  }

  getTotal() {
    let summaryTotal = 0;
    for (let i = 0; i < this.products.length; i++) {
      summaryTotal += parseFloat(this.products[i].value);
    }
    this.total = summaryTotal;
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  checkout() {
    this.userData = this.userManagementService.getUser();
    if(this.userData.id){
      this.router.navigate(["checkout"]);
      this.categoriesService.updatePurchase(this.products);
      this.generalInfoServiceService.closeModal();
    } else{
      this.loadLogin();
    }
  }

  loadLogin() {
    this.generalInfoServiceService.openModal(this.typeAction, userSession.login);
  }


}
