import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Router } from '@angular/router';
import { UserManagementService } from '../../../services/user-management.service';
import { userkeystorage } from '../../../../assets/emuns/const';
import countriesJson from '../../../../assets/data/country-codes.json';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  countryCodes: any[] = [];
  signupForm: FormGroup;
  loading = false;
  alertError = false;
  alertSuccess = false;
  userData: any;
  erroralertTxt = "";

  constructor(
    private fb: FormBuilder,
    private categoriesService: FilterCategoriesService,
    private router: Router,
    private userManagementService: UserManagementService
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{2,3}\d{1,4}$/)]],
      phonePrefix: ['+356'],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.countryCodes = countriesJson;
    this.getUserData();
  }

  getUserData() {

    this.userData = this.userManagementService.getUser();

    if (this.userData) {
      const cleanPhonePrefix = this.userData.phonePrefix?.trim();

      this.signupForm.patchValue({
        firstName: this.userData.name,
        lastName: this.userData.lastName,
        address: this.userData.address,
        city: this.userData.city,
        postalCode: this.userData.postalCode,
        phonePrefix: cleanPhonePrefix,
        phoneNumber: this.userData.phoneNumber,
        email: this.userData.email
      });
    }
  }

  onUpdateUser() {
    if (this.signupForm.valid) {
      this.loading = true;

      const formValue = this.signupForm.value;
      const updatedUser = this.getUserUpdateInfo(formValue);

      let token = this.userManagementService.getToken();

      if (token) {
        this.userManagementService.updateUser(updatedUser,  this.userData.id, token).subscribe(
          response => {
            this.alertSuccessManagement();

            const updatedUserData = {
              ...this.userManagementService.getUser(), 
              ...updatedUser 
            };
  
            this.categoriesService.updateUserLoginData(updatedUser);
            localStorage.setItem(userkeystorage, JSON.stringify(updatedUserData));

          },
          error => {
            this.showErrorAlert('Error updating user');
            this.loading = false;
          }
        );
      }
    }
  }

  alertSuccessManagement() {
    this.loading = false;
    this.alertSuccess = true;
    setTimeout(() => {
      this.alertSuccess = false;
    }, 5000);
  }

  getUserUpdateInfo(formValue: any) {
    return {
      name: formValue.firstName,
      lastName: formValue.lastName,
      address: formValue.address,
      city: formValue.city,
      postalCode: formValue.postalCode,
      phoneNumber: formValue.phoneNumber,
      email: formValue.email,
      phonePrefix: formValue.phonePrefix
    };
  }


  showErrorAlert(textAlert: string) {
    this.alertError = true;
    this.erroralertTxt = textAlert;
    setTimeout(() => {
      this.alertError = false;
    }, 5000);
  }

  goToInit() {
    this.router.navigate(['']);
  }
}
