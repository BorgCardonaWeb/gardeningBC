import { Component, OnInit } from '@angular/core';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { userkeystorage } from '../../../../assets/emuns/const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  constructor(private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    console.log(this.localStorageService.getItem(userkeystorage))
  }

  goToInit(){
    this.router.navigate(["home"]);
  }

}
