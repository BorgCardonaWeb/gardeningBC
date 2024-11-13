import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-purchase',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-purchase.component.html',
  styleUrl: './confirmation-purchase.component.scss'
})
export class ConfirmationPurchaseComponent {

  @Input() orderID = 0;
  
  constructor(private router: Router) {

  }

  showOrders() {
    this.router.navigate(["orders"]);
  }

  goToInit(){
    this.router.navigate(['']);
  }



}
