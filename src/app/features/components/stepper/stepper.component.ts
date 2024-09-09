import { Component } from '@angular/core';
import { VerifyContactPurchaseComponent } from '../verify-contact-purchase/verify-contact-purchase.component';
import { VerifyPurchaseComponent } from '../verify-purchase/verify-purchase.component';
import { VerifyPaymentMetodComponent } from '../verify-payment-metod/verify-payment-metod.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [VerifyContactPurchaseComponent,
    VerifyPurchaseComponent,
    VerifyPaymentMetodComponent,
    CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {

  currentStep: number = 1;
  formIsValid = true;
  contactInfoValues: any;

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  handleFormValidity(event: any): void {
    if (this.currentStep === 2) {
      this.formIsValid = event.isValid;
      this.contactInfoValues = event.formValues;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

}
