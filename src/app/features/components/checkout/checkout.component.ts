import { Component } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [StepperComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  constructor() {
    const modal = document.getElementById('modal-element');
    if (modal) {
      modal.style.display = 'none';

    }

  }

}
