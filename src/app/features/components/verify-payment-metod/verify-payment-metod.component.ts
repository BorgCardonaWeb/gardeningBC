import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VerifyPurchaseComponent } from '../verify-purchase/verify-purchase.component';

@Component({
  selector: 'app-verify-payment-metod',
  standalone: true,
  imports: [CommonModule, VerifyPurchaseComponent],
  templateUrl: './verify-payment-metod.component.html',
  styleUrl: './verify-payment-metod.component.scss'
})
export class VerifyPaymentMetodComponent {
  @Input() summaryData: any; 
  isCollapsed = true; 
  isCollapsedPurchase = true;
  classGrid = "col-12 col-sm-12 col-xs-12 col-md-12 col-lg-12"


  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleCollapsePurchase(): void {
    this.isCollapsedPurchase = !this.isCollapsedPurchase;
  }
}
