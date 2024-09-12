import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-purchase',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-purchase.component.html',
  styleUrl: './confirmation-purchase.component.css'
})
export class ConfirmationPurchaseComponent {

  @Input() orderID = 0;
  
  constructor() {

  }

}
