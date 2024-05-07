import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import { NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { DeliveriesComponent } from '../deliveries/deliveries.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    DeliveriesComponent,
    CommonModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  title: string | null = null;
  type: number | null = null;;
  constructor(public modalRef: MdbModalRef<ModalComponent>) {}

}
