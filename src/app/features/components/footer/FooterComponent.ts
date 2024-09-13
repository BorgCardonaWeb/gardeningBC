import { Component } from '@angular/core';
import { footerOptions } from '../../../../assets/emuns/generalEnums';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(private generalInfoServiceService: GeneralInfoServiceService) { }

  openModal(type: number) {
   this.generalInfoServiceService.openModal(type, String(Object.values(footerOptions)[type]))
  }
}
