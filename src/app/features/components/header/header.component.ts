import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { navOptions, userSession } from '../../../../assets/emuns/generalEnums';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Observable } from 'rxjs';
import { product } from '../../models/models';
import { productsToCartKeyStorage } from '../../../../assets/emuns/const';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  providers: [
    GeneralInfoServiceService,
    MdbModalService
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Output() initPageLogo = new EventEmitter<any>();
  dataModalAction$: Observable<boolean> | undefined;
  dataCounter$: Observable<any> | undefined;
  products: product[] = [];
  counter = 0;


  get showCounter() {
    this.counter = this.products.length;
    return this.products.length;
  }

  contactTitle = navOptions.contact;
  shoppingTitle = navOptions.ShoppingCart;
  loginTitle = userSession.login;

  constructor(private generalInfoServiceService: GeneralInfoServiceService, private categoriesService: FilterCategoriesService) { }

  ngOnInit(): void {
    this.getCounterStorage();
    this.getCounterProducts();
    this.closeModal();
  }

  openModal(type: number, option: string) {
    this.generalInfoServiceService.openModal(type, option);
  }

  goToInitLogo() {
    this.initPageLogo.emit(true);
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
    }
  }

  closeModal() {
    this.dataModalAction$ = this.categoriesService.dataModal$;
    this.dataModalAction$.subscribe(_data => {
      this.generalInfoServiceService.closeModal();
      console.log("Se subscribe")
    });
    
  }

}
