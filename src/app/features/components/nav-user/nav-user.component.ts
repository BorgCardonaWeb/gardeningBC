import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { UserManagementService } from '../../../services/user-management.service';
import { navOptions } from '../../../../assets/emuns/generalEnums';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit {
  userOrders = navOptions.userOrders;
  userInfo = navOptions.userInfo;
  userData: any;
  activeTab: string = '';  // Variable para rastrear la pestaña activa

  constructor(private generalInfoServiceService: GeneralInfoServiceService,
              private router: Router,
              private userManagementService: UserManagementService) { }

  ngOnInit(): void {
    this.getUserData();
    this.setActiveTabBasedOnRoute();  // Configura la pestaña activa basada en la ruta

    // Escucha cambios en la ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveTabBasedOnRoute();
    });
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

  goToInit(){
    this.activeTab = '';  
    this.router.navigate(["home"]);
  }

  private setActiveTabBasedOnRoute() {
    const currentRoute = this.router.url;
    if (currentRoute === '/orders') {
      this.activeTab = 'orders';
    } else if (currentRoute === '/user') {
      this.activeTab = 'personalInfo';
    } else {
      this.activeTab = ''; 
    }
  }
}
