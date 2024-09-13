import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VerifyPurchaseComponent } from '../verify-purchase/verify-purchase.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../../services/orders.service';
import { islandType, orderStatus, paymentType } from '../../../../assets/emuns/generalEnums';
import { productsToCartKeyStorage } from '../../../../assets/emuns/const';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LoadingComponent } from '../loading/loading.component';
import { FilterCategoriesService } from '../../../services/filter-categories.service';

@Component({
  selector: 'app-verify-payment-metod',
  standalone: true,
  imports: [CommonModule, 
    VerifyPurchaseComponent, 
    ReactiveFormsModule, 
    LoadingComponent],
  templateUrl: './verify-payment-metod.component.html',
  styleUrl: './verify-payment-metod.component.scss'
})
export class VerifyPaymentMetodComponent {
  @Input() summaryData: any;
  @Input() idClient: any;
  @Input() summaryPurchaseInfo: any;
  @Output() orderID = new EventEmitter<any>();

  loading = false;
  alertError = false;
  isCollapsed = false;
  isCollapsedPurchase = false;
  classGrid = "col-12 col-sm-12 col-xs-12 col-md-12 col-lg-12";
  paymentForm: FormGroup;
  subtotal = 0;
  total = 0;
  

  orderData: any

  constructor(private fb: FormBuilder, 
    private ordersService: OrdersService,
    private localStorageService: LocalStorageService,
    private categoriesService: FilterCategoriesService) {

    this.paymentForm = this.fb.group({
      payByCard: [{ value: paymentType.card, disabled: true }],
      paymentMethod: [paymentType.cash],
      payByCash: [paymentType.cash],
      payOnDeliveryWithCard: [paymentType.cardDelivery]
    });

  }


  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleCollapsePurchase(): void {
    this.isCollapsedPurchase = !this.isCollapsedPurchase;
  }

  customFunction() {
    this.loading = true;
    this.alertError = false;
    this.getTotals();
    this.generateOrder();
  }


  getTotals() {
    let summaryTotal = 0;
    for (let i = 0; i < this.summaryPurchaseInfo.length; i++) {
      summaryTotal += parseFloat(this.summaryPurchaseInfo[i].value);
    }
    this.subtotal = summaryTotal;
    this.validateExtraChague();
    if (this.validateExtraChague()) {
      this.total = summaryTotal + 5;
    } else {
      this.total = summaryTotal;
    }
  }

  validateExtraChague(): boolean {

    if (this.summaryData.island == islandType.gozo) {
      return true;
    } else {
      return false;
    }
  }

  generateOrder() {
    this.orderData = this.getOrderObject();
    this.submitOrder();
  }

  submitOrder() {
    this.ordersService.createOrder(this.orderData).subscribe(
      response => {
        this.alertError = false;
        this.loading = false;
        this.localStorageService.removeItem(productsToCartKeyStorage);
        this.categoriesService.updateCartProducts([]);
        this.orderID.emit(response?.OrderID);
      },
      error => {
        this.loading = false;
        this.alertError = true;
      }
    );
  }

  getOrderObject() {
    return {
      ClientID: this.idClient,
      Date: new Date().toISOString().split('T')[0],
      Status: orderStatus.pending,
      DeliveryAddress: this.summaryData.address,
      City: this.summaryData.city,
      PostalCode: this.summaryData.postalCode,
      Prefix: this.summaryData.phonePrefix,
      Phonenumber: this.summaryData.phoneNumber,
      DeliveryNote: this.summaryData.deliveryNote,
      Island: this.summaryData.island,
      GeneralNotes: '',
      ExtraCostDeliveryGozo: this.getIsExtraCost(this.summaryData.island),
      PaymentType: this.paymentForm.value.paymentMethod,
      Amount: this.subtotal,
      TotalAmount: this.total,
      arrayProduct: this.getArrayProducts()
    }
  }

  getArrayProducts() {
    return this.summaryPurchaseInfo.map((element: any) => {
      return {
        productID: element.productID,
        value: element.value,
        quantities: element.quantities
      }
    });
  }

  getIsExtraCost(island: string) {
    if (island === islandType.gozo) {
      return 5;
    } else {
      return 0;
    }
  }

}
