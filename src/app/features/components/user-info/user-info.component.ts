import { Component, OnInit } from '@angular/core';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { userkeystorage } from '../../../../assets/emuns/const';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {

  constructor(private generalInfoServiceService: GeneralInfoServiceService,
    private categoriesService: FilterCategoriesService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    console.log(this.localStorageService.getItem(userkeystorage))
  }

}
