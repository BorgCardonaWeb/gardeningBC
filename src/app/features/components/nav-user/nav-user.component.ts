import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { UserManagementService } from '../../../services/user-management.service';
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
  userData: any;

  constructor(private generalInfoServiceService: GeneralInfoServiceService,
    private router: Router,
    private userManagementService: UserManagementService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.userData = this.userManagementService.getUser();
  }

  openModal(type: number, option: string) {
    this.generalInfoServiceService.openModal(type, option);
  }


  showOrders() {
    this.router.navigate(["orders"]);
  }

  showPersonalData() {
    this.router.navigate(["user"]);
  }





}
