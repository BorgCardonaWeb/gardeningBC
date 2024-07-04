import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { userkeystorage } from '../../../../assets/emuns/const';
import { navOptions } from '../../../../assets/emuns/generalEnums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.scss'
})
export class NavUserComponent implements OnInit {
  userOrders = navOptions.userOrders;
  userInfo = navOptions.userInfo;

  constructor(private generalInfoServiceService: GeneralInfoServiceService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    console.log(this.localStorageService.getItem(userkeystorage))
  }

  openModal(type: number, option: string) {
    this.generalInfoServiceService.openModal(type, option);
  }

  
  showOrders(){
    this.router.navigate(["orders"]);
  }

  showPersonalData(){
    this.router.navigate(["user"]);
  }


  


}
