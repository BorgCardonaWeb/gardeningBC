import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-verify-payment-metod',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-payment-metod.component.html',
  styleUrl: './verify-payment-metod.component.scss'
})
export class VerifyPaymentMetodComponent {
  @Input() summaryData: any; // Recibe datos del componente padre
  isCollapsed = true; // Estado inicial colapsado

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
