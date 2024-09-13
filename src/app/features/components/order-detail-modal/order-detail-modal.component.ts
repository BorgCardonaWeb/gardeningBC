import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { GetStatusLabelComponent } from '../get-status-label/get-status-label.component';
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { ProductsServicesService } from '../../../services/products-services.service';

@Component({
  selector: 'app-order-detail-modal',
  standalone: true,
  imports: [CommonModule, GetStatusLabelComponent, PaymentTypeComponent],
  templateUrl: './order-detail-modal.component.html',
  styleUrl: './order-detail-modal.component.scss'
})
export class OrderDetailModalComponent implements OnInit {

  @Input() orderNumber: any;
  isCollapsed = false;
  isCollapsedOrder = false;
  isCollapsedProducts = false;

  summaryData: any;
  products: any;

  constructor(private ordersService: OrdersService,
    private productsServicesService: ProductsServicesService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.ordersService.getOrderById(this.orderNumber).subscribe(
      (data: any) => {
        this.summaryData = data;
        const productIDs = data.arrayProduct.map((product: any) => product.productID);
        this.getProductsDetail(productIDs);
      }
    )
  }

  getProductImageById(productID: number): string {
    const product = this.products?.find((item: any) => item.productID === productID);
    return this.getImageSrc(product ? product.image : '');
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }


  getProductNameById(productID: number): string {
    const product = this.products?.find((item: any) => item.productID === productID);
    return product ? product.name : '';
  }

  getProductsDetail(idsArray: any) {
    this.productsServicesService.getProductsByIds(idsArray).subscribe(
      (data) => {
        this.products = data;
        console.log(this.products)
      }
    )
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleCollapseOrder(): void {
    this.isCollapsedOrder = !this.isCollapsedOrder;
  }

  toggleCollapseProducts(): void {
    this.isCollapsedProducts = !this.isCollapsedProducts;
  }

  getTotalWithExtraCharge(total: number) {
    return Number(total) - Number(5);
  }

}
