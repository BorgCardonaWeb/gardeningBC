import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VerifyPurchaseComponent } from '../verify-purchase/verify-purchase.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../../services/orders.service';
import { islandType, orderStatus, paymentType } from '../../../../assets/emuns/generalEnums';
import { valueDefaultIsland } from '../../../../assets/emuns/const';

@Component({
  selector: 'app-verify-payment-metod',
  standalone: true,
  imports: [CommonModule, VerifyPurchaseComponent, ReactiveFormsModule],
  templateUrl: './verify-payment-metod.component.html',
  styleUrl: './verify-payment-metod.component.scss'
})
export class VerifyPaymentMetodComponent {
  @Input() summaryData: any;
  @Input() idClient: any;
  @Input() summaryPurchaseInfo: any;
  

  isCollapsed = false;
  isCollapsedPurchase = false;
  classGrid = "col-12 col-sm-12 col-xs-12 col-md-12 col-lg-12";
  paymentForm: FormGroup;

  orderData = {
    ClientID: 1,
    Date: new Date().toISOString().split('T')[0],
    Status: orderStatus.pending,
    DeliveryAddress: '',
    City: '',
    PostalCode: '',
    Prefix: '',
    Phonenumber: '',
    DeliveryNote: '',
    Island: 'Malta',
    GeneralNotes: '',
    ExtraCostDeliveryGozo: '',
    PaymentType: 'Card',


    arrayProduct: [],
    Amount: '',
    TotalAmount: ''

  };

  constructor(private fb: FormBuilder, private ordersService: OrdersService) {

    this.paymentForm = this.fb.group({
      payByCard: [{ value: paymentType.card, disabled: true }],
      paymentMethod: [paymentType.cash],
      payByCash: [paymentType.cash],
      payOnDeliveryWithCard: [paymentType.cardDelivery]
    });

  }


  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleCollapsePurchase(): void {
    this.isCollapsedPurchase = !this.isCollapsedPurchase;
  }

  customFunction() {
    console.log(this.summaryPurchaseInfo)
    // Implementa la lógica que deseas ejecutar cuando el paso sea 3


    //ejecutar un metodo de la pantalla pagos
    //crear tabla
    //limpiar cache de carro de compras
    //crear objeto
    //consumir api de guardado 
    //tomar los datos de retorno y enviarlos a la nueva pantalla
    //redireccionar a la nueva pantalla
    //ponerle seguridad de logueo a la pantalla de confirmacion
    //ponerle un link de visualizar mis productos
  }



  getOrderData() {
    return {
      ClientID: this.idClient,
      Date: new Date().toISOString().split('T')[0],
      Status: orderStatus.pending,
      DeliveryAddress: this.summaryData.address,
      City: this.summaryData.city,
      PostalCode: this.summaryData.postalCode,
      Prefix: this.summaryData.phonePrefix,
      Phonenumber: this.summaryData.phoneNumber,
      DeliveryNote: this.summaryData.deliveryNote,
      Island: this.summaryData.island,
      GeneralNotes: '',
      ExtraCostDeliveryGozo: this.getIsExtraCost(this.summaryData.island),
      PaymentType: this.paymentForm.value.paymentMethod

    }
  }

  getIsExtraCost(island: string) {
    if (island === islandType.gozo) {
      return true;
    } else {
      return false;
    }
  }

  submitOrder() {
    this.ordersService.createOrder(this.orderData).subscribe(
      response => {
        console.log('Order created successfully:', response);
        // Maneja la respuesta del servidor, por ejemplo, muestra un mensaje o redirige al usuario
      },
      error => {
        console.error('Error creating order:', error);
        // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
      }
    );
  }


}
