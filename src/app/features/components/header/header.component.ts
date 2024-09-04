import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { navOptions, userSession } from '../../../../assets/emuns/generalEnums';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Observable } from 'rxjs';
import { product } from '../../models/models';
import { productsToCartKeyStorage } from '../../../../assets/emuns/const';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserManagementService } from '../../../services/user-management.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Output() initPageLogo = new EventEmitter<any>();
  @Output() showUserPanel = new EventEmitter<boolean>();

  dataModalAction$: Observable<boolean> | undefined;
  userLoginData$: Observable<any> | undefined;
  dataCounter$: Observable<any> | undefined;
  products: product[] = [];
  counter: number | undefined;
  showLogout = false;


  get showCounter() {
    let counterstorage = this.categoriesService.getDataByStorage(productsToCartKeyStorage)?.length;
    let getCounterProducts = this.products.length;

    if (counterstorage > 0) {
      this.counter = counterstorage;
      return true;
    } else if (getCounterProducts > 0) {
      this.counter = getCounterProducts;
      return true;
    } else {
      return false;
    }
  }

  contactTitle = navOptions.contact;
  shoppingTitle = navOptions.ShoppingCart;
  loginTitle = userSession.login;

  constructor(private generalInfoServiceService: GeneralInfoServiceService,
    private userManagementService: UserManagementService,
    private router: Router,
    private categoriesService: FilterCategoriesService) { }

  ngOnInit(): void {
    this.getCounterStorage();
    this.getCounterProducts();
    this.closeModal();
    this.getLoginUserData();
    this.getUserByStorage();
  }

  openModal(type: number, option: string) {
    this.generalInfoServiceService.openModal(type, option);
  }

  goToInitLogo() {
    this.router.navigate(["home"]);
  }

  getCounterProducts() {
    this.dataCounter$ = this.categoriesService.dataCartProducts$;
    this.dataCounter$.subscribe(data => {
      this.products = data;
    });
  }

  getCounterStorage() {
    const storage = this.categoriesService.getDataByStorage(productsToCartKeyStorage);
    if (storage) {
      this.products = storage;
      this.counter = this.products.length;
    }
  }

  closeModal() {
    this.dataModalAction$ = this.categoriesService.dataModal$;
    this.dataModalAction$.subscribe(_data => {
      this.generalInfoServiceService.closeModal();
    });
  }

  getLoginUserData() {
    this.userLoginData$ = this.categoriesService.userLoginDataSubject$;
    this.userLoginData$.subscribe(_data => {
      if (_data.id) {
        this.showLogout = true;
        this.showUserPanel.emit(true);
      }
    });
  }

  getUserByStorage() {
    let user = this.userManagementService.getUser();
    if (user?.id) {
      this.categoriesService.updateUserLoginData(user);
    }
  }


  logout() {
    this.categoriesService.clearStorage();
    this.products = [];
    this.showLogout = false;
    this.showUserPanel.emit(false);
    this.router.navigate(["home"]);
  }

}
