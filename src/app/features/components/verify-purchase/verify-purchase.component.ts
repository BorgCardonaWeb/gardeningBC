import { Component, Input } from '@angular/core';
import { product } from '../../models/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { valueDefaultIsland } from '../../../../assets/emuns/const';

@Component({
  selector: 'app-verify-purchase',
  standalone: true,
  providers: [CurrencyPipe],
  imports: [CommonModule],
  templateUrl: './verify-purchase.component.html',
  styleUrl: './verify-purchase.component.scss'
})
export class VerifyPurchaseComponent {

  cartItems: product[] = [];
  total: number = 0;
  subtotal: number = 0;
  extraChargueDelivery = false;
  @Input() classGrid = "col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6";
  @Input() currentStep: number = 0;

  purchaseSubject$: Observable<any> | undefined;
  @Input() summaryData: any = undefined;

  constructor(private categoriesService: FilterCategoriesService,
    private generalInfoServiceService: GeneralInfoServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPurchaseInfo();
  }

  getPurchaseInfo() {
    this.purchaseSubject$ = this.categoriesService.purchaseSubject$;

    this.purchaseSubject$.subscribe(_data => {
      this.cartItems = _data;
      this.getTotal()
    });

    setTimeout(() => {
      if (this.cartItems.length < 1) {
        this.generalInfoServiceService.closeModal();
        this.router.navigate(["home"]);
      }
    });

  }

  getTotal() {
    let summaryTotal = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      summaryTotal += parseFloat(this.cartItems[i].value);
    }
    this.subtotal = summaryTotal;
    this.validateExtraChague();
    if (this.extraChargueDelivery) {
      this.total = summaryTotal + 5;
    } else {
      this.total = summaryTotal;
    }
  }

  validateExtraChague() {
    if (this.summaryData) {
      if (this.summaryData?.island == valueDefaultIsland) {
        if(this.currentStep != 1){
          this.extraChargueDelivery = true;
        }
      }
    }
  }

}
