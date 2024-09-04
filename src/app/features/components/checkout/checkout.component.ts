import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { product } from '../../models/models';
import { productsToCartKeyStorage, purchaseTotalkeystorage } from '../../../../assets/emuns/const';
import { Observable } from 'rxjs';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  products: product[] = [];
  total: number = 0;

  purchaseSubject$: Observable<any> | undefined;

  constructor(private categoriesService: FilterCategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPurchaseInfo();
  }

  getPurchaseInfo() {
    this.purchaseSubject$ = this.categoriesService.purchaseSubject$;
    this.purchaseSubject$.subscribe(_data => {
      this.products = _data;
      console.log(_data)
      this.getTotal()
    });

    setTimeout(() => {
      if (this.products.length < 1) {
        this.router.navigate(["home"]);
      }
    });

  }

  getTotal() {
    let summaryTotal = 0;
    for (let i = 0; i < this.products.length; i++) {
      summaryTotal += parseFloat(this.products[i].value);
    }
    this.total = summaryTotal;
    console.log(this.total)
  }

}
