import { Component } from '@angular/core';
import { footerOptions } from '../../../../assets/emuns/generalEnums';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private generalInfoServiceService: GeneralInfoServiceService) { }

  openModal(type: number) {
    this.generalInfoServiceService.openModal(type, Object.values(footerOptions)[type])
  }
}
