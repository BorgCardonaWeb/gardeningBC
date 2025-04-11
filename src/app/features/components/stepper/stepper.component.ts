import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { VerifyContactPurchaseComponent } from '../verify-contact-purchase/verify-contact-purchase.component';
import { VerifyPurchaseComponent } from '../verify-purchase/verify-purchase.component';
import { VerifyPaymentMetodComponent } from '../verify-payment-metod/verify-payment-metod.component';
import { CommonModule } from '@angular/common';
import { ConfirmationPurchaseComponent } from '../confirmation-purchase/confirmation-purchase.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [VerifyContactPurchaseComponent,
    VerifyPurchaseComponent,
    VerifyPaymentMetodComponent,
    ConfirmationPurchaseComponent,
    CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {

  currentStep: number = 1;
  formIsValid = true;
  showConfirmation = false;
  contactInfoValues: any;
  idClient: any;
  summaryPurchaseInfo: any;
  orderID = 0;
  statusForm = true;

  @ViewChild(VerifyPaymentMetodComponent) paymentMethodComponent!: VerifyPaymentMetodComponent;
  @ViewChild(VerifyPurchaseComponent) verifyPurchaseComponent!: VerifyPurchaseComponent;

  constructor(private cdr: ChangeDetectorRef) { }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }

    if (this.currentStep == 2) {
      this.executeSummaryPurchaseMethod();
    }

    if (this.currentStep == 3) {
      this.executePaymentMethodFunction();
    }
  }

  handleFormValidity(event: any): void {
    if (this.currentStep === 2) {
      this.formIsValid = event.isValid;
      this.contactInfoValues = event.formValues;
      this.idClient = event.idClient;
      this.cdr.detectChanges();
    }
  }

  handleShowConfirmation(event: any): void {
    this.showConfirmation = true;
    this.orderID = event;

  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      if (this.currentStep == 1) {
        this.formIsValid = true;
      }
    }
  }

  executePaymentMethodFunction() {
    if (this.paymentMethodComponent) {
      this.paymentMethodComponent.customFunction();
    }
  }

  executeSummaryPurchaseMethod() {
    if (this.verifyPurchaseComponent) {
      this.summaryPurchaseInfo = this.verifyPurchaseComponent.cartItems;
    }
  }

}
