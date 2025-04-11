import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Router } from '@angular/router';
import { UserManagementService } from '../../../services/user-management.service';
import { valueDefaultIsland } from '../../../../assets/emuns/const';
import { CommonModule } from '@angular/common';
import countriesJson from '../../../../assets/data/country-codes.json';

@Component({
  selector: 'app-verify-contact-purchase',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-contact-purchase.component.html',
  styleUrl: './verify-contact-purchase.component.scss'
})
export class VerifyContactPurchaseComponent implements AfterViewInit {
  countryCodes: any[] = [];

  signupForm: FormGroup;
  loading = false;
  alertError = false;
  alertSuccess = false;
  userData: any;
  erroralertTxt = "";
  showPriceWarning = false;
  @Output() formValidityChange = new EventEmitter<any>();
  @Input() summaryData: any = undefined;
  idClient: any;


  constructor(
    private fb: FormBuilder,
    private categoriesService: FilterCategoriesService,
    private userManagementService: UserManagementService
  ) {
    this.signupForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{2,3}\d{1,4}$/)]],
      phonePrefix: ['+356'],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      deliveryNote: [''],
      island: ['Malta', Validators.required]
    });

    this.signupForm.statusChanges.subscribe((status) => {
      this.formValidityChange.emit({
        isValid: status === 'VALID',
        formValues: this.signupForm.value,
        idClient: this.getIdClient()
      });
    });
  }

  getIdClient() {
    if (this.idClient) {
      return this.idClient
    } else {
      this.userData = this.userManagementService.getUser();
      if (this.userData) {
        return this.userData.id;
      }
    }
  }


  ngAfterViewInit(): void {
    this.getUserData();
    this.countryCodes = countriesJson;
  }

  getUserData() {
    if (this.summaryData) {
      this.getUserDataByForm();
    } else {
      this.getUserDataByModel();
    }
    this.islandChange();

  }

  getUserDataByForm() {

    this.signupForm.patchValue({
      island: this.summaryData.island,
      address: this.summaryData.address,
      city: this.summaryData.city,
      postalCode: this.summaryData.postalCode,
      phonePrefix: this.summaryData.phonePrefix?.trim(),
      phoneNumber: this.summaryData.phoneNumber,
      deliveryNote: this.summaryData.deliveryNote
    });
  }

  getUserDataByModel() {
    this.userData = this.userManagementService.getUser();

    if (this.userData) {
      this.idClient = this.userData.id;
      const cleanPhonePrefix = this.userData.phonePrefix?.trim();

      this.signupForm.patchValue({
        address: this.userData.address,
        city: this.userData.city,
        postalCode: this.userData.postalCode,
        phonePrefix: cleanPhonePrefix,
        phoneNumber: this.userData.phoneNumber,
        deliveryNote: ""
      });
    }
  }

  onIslandChange(): void {
    this.islandChange();
  }

  islandChange(): void {
    const selectedIsland = this.signupForm.get('island')?.value;
    this.showPriceWarning = selectedIsland === valueDefaultIsland;
  }

  alertSuccessManagement() {
    this.loading = false;
    this.alertSuccess = true;
    setTimeout(() => {
      this.alertSuccess = false;
    }, 5000);
  }

  showErrorAlert(textAlert: string) {
    this.alertError = true;
    this.erroralertTxt = textAlert;
    setTimeout(() => {
      this.alertError = false;
    }, 5000);
  }

  validateDetails() {
    if (this.signupForm.valid) {
    }
  }

}

