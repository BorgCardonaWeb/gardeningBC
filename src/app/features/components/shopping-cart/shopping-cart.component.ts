import { Component } from '@angular/core';
import { product } from '../../models/models';
import { productsToCartKeyStorage } from '../../../../assets/emuns/const';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { navOptions, userSession } from '../../../../assets/emuns/generalEnums';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe,
    LocalStorageService,
    GeneralInfoServiceService,
    MdbModalService],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  get showAlert() {
    return this.products?.length < 1;
  }

  total = 0;
  typeAction = 5;

  products: product[] = [];

  constructor(private categoriesService: FilterCategoriesService,
    private localStorageService: LocalStorageService,
    private generalInfoServiceService: GeneralInfoServiceService) { }

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

  validateLogin() {
    this.categoriesService.updateModal(true);
    setTimeout(() => {
      this.loadLogin();
    }, 300);
   /* console.log("Validar datos en secion para saber si se inicio sesion");
    console.log("En caso que no haya creado el usuario");
    //this.loadLogin();
    //Pantalla de login, registro y olvido de contrasenia
    console.log("En caso que si haya creado el usuario");
    //Enviar al epet de confirmar datos personales*/
  }

  loadLogin() {
    this.generalInfoServiceService.openModal(this.typeAction, userSession.login);
  }


}
