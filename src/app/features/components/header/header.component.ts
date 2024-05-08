import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { navOptions } from '../../../../assets/emuns/generalEnums';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent],
  providers: [
    GeneralInfoServiceService,
    MdbModalService
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private generalInfoServiceService: GeneralInfoServiceService) { }

  openModal(type: number) {
    this.generalInfoServiceService.openModal(type, navOptions.contact);
  }

}
