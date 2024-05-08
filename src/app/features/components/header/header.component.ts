import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { navOptions } from '../../../../assets/emuns/generalEnums';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent],
  providers: [
    MdbModalService
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-xl',
      data: {
        title: navOptions.contact
      }
    });
  }
}
