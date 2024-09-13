import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { UserManagementService } from '../../../services/user-management.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { GetStatusLabelComponent } from '../get-status-label/get-status-label.component';
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { order } from '../../../../assets/emuns/generalEnums';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    CurrencyPipe,
    GetStatusLabelComponent,
    PaymentTypeComponent
  ],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  idClient: any;
  orders: any;
  alertError = false;
  typeAction = 8;

  displayedColumns: string[] = ['OrderID', 'Status', 'PaymentType', 'Date', 'TotalAmount', 'Actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router,
    private ordersService: OrdersService,
    private userManagementService: UserManagementService,
    private generalInfoServiceService: GeneralInfoServiceService,) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  goToInit() {
    this.router.navigate(["home"]);
  }

  getInitialData() {
    this.getIdClient();
    this.loadOrders();
  }

  getIdClient() {
    let userData = this.userManagementService.getUser();
    if (userData) {
      this.idClient = userData.id;
    }
  }

  loadOrders(): void {
    this.ordersService.getOrdersByClientId(this.idClient).subscribe(
      (data: any) => {
        this.alertError = false;
        this.orders = data;

        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.alertError = true;
      }
    );
  }

  openModalOrder(orderNumer: number){
    this.generalInfoServiceService.openModal(this.typeAction, order.title, String(orderNumer));
  }

}
