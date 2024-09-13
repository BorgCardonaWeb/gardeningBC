import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-order-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail-modal.component.html',
  styleUrl: './order-detail-modal.component.scss'
})
export class OrderDetailModalComponent implements OnInit {

  @Input() orderNumber: any;
  isCollapsed = false;

  summaryData: any;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.ordersService.getOrderById(this.orderNumber).subscribe(
      (data: any) => {
        this.summaryData = data;
        console.log(data)
      }
    )
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
