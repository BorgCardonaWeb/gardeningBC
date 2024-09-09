import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Router } from '@angular/router';
import { UserManagementService } from '../../../services/user-management.service';
import { userkeystorage } from '../../../../assets/emuns/const';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-contact-purchase',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-contact-purchase.component.html',
  styleUrl: './verify-contact-purchase.component.scss'
})
export class VerifyContactPurchaseComponent {
  countryCodes: any[] = [];
  signupForm: FormGroup;
  loading = false;
  alertError = false;
  alertSuccess = false;
  userData: any;
  erroralertTxt = "";
  showPriceWarning = false;
  @Output() formValidityChange = new EventEmitter<boolean>(); 

  constructor(
    private fb: FormBuilder,
    private categoriesService: FilterCategoriesService,
    private router: Router,
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
      this.formValidityChange.emit(status === 'VALID'); 
    });
  }

  ngOnInit(): void {
    this.getCountryCodes();
    this.getUserData();
  }

  getUserData() {

    this.userData = this.userManagementService.getUser();

    if (this.userData) {
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
    const selectedIsland = this.signupForm.get('island')?.value;
    this.showPriceWarning = selectedIsland === 'Gozo';
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


  getCountryCodes() {
    this.categoriesService.getCountryCodes().subscribe(
      data => {
        this.countryCodes = data;
      },
      error => {
        this.showErrorAlert('Error fetching country codes');
      }
    );
  }

  validateDetails(){
    if (this.signupForm.valid) {
      console.log("Is valid")
    }
  }

}

