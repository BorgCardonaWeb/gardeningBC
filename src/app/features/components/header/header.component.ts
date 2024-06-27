import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { navOptions } from '../../../../assets/emuns/generalEnums';
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
  dataCounter$: Observable<any> | undefined;
  products: product[] = [];
  counter = 0;


  get showCounter() {
    this.counter = this.products.length;
    console.log(this.counter)
    return this.products.length;
  }

  constructor(private generalInfoServiceService: GeneralInfoServiceService, private categoriesService: FilterCategoriesService) { }

  ngOnInit(): void {
    this.getCounterStorage();
    this.getCounterProducts();
  }

  openModal(type: number) {
    this.generalInfoServiceService.openModal(type, navOptions.contact);
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
    debugger
    const storage = this.categoriesService.getDataByStorage(productsToCartKeyStorage);
    if (storage) {
      this.products = storage;
    }
  }

}
