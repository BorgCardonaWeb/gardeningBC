import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { footerOptions } from '../../../../assets/emuns/generalEnums';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  providers: [
    MdbModalService
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  openModal(type: number) {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-xl',
      data: {
        title: Object.values(footerOptions)[type],
        type
      }
    });
  }
}
