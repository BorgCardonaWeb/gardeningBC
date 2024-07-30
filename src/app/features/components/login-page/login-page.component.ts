import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { userkeystorage } from '../../../../assets/emuns/const';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserManagementService } from '../../../services/user-management.service';
import { userModel } from '../../models/models';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  showSignupForm = false;
  error = false;
  alertSuccess = false;
  loading = false;

  @Input() showGeneralInf: boolean = false;
  countryCodes: any[] = [];

  get isValidConfirm() {
    if (this.signupForm) {
      const password = this.signupForm.value['password'];
      const confirmPassword = this.signupForm.value['confirmPassword'];
      if (password !== confirmPassword) {
        return false
      } else {
        return true;
      }
    } else {
      return true;
    }
  }


  constructor(private fb: FormBuilder,
    private categoriesService: FilterCategoriesService,
    private generalInfoServiceService: GeneralInfoServiceService,
    private localStorageService: LocalStorageService,
    private userManagementService: UserManagementService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required
      ]]
    });

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{2,3}\d{1,4}$/)]],
      phonePrefix: ['+356'], // Default value
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.getCountryCodes();
  }

  getCountryCodes() {
    this.categoriesService.getCountryCodes().subscribe(
      data => {
        this.countryCodes = data;
      },
      error => {
      }
    );
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      this.generateMockStogareUser();
    }
  }

  generateMockStogareUser() {
    this.loading = true;
    let data = [{
      name: "Xiomara Pulido",
      id: "123"
    }]


    setTimeout(() => {
      this.categoriesService.updateUserLoginData(data);
    });
    setTimeout(() => {
      this.generalInfoServiceService.closeModal();
      this.loading = false
    }, 100);
  }



  toggleSignupForm(): void {
    this.showSignupForm = !this.showSignupForm;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmitSignup(): void {
    /*
    


    */
    console.log(this.signupForm)
    if (this.signupForm.valid) {
      this.error = false;
      let user: userModel ={
        name: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        address: this.signupForm.value.address,
        city: this.signupForm.value.city,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phoneNumber: this.signupForm.value.phoneNumber,
        
        postalCode: this.signupForm.value.postalCode
      } 

      this.userManagementService.createUser(user).subscribe(
        data =>{
          console.log(data);
          this.alertSuccess = true;
          this.toggleSignupForm();
          setTimeout(() => {
            this.alertSuccess = false;
          }, 5000);
        },
        error =>{
          console.log(error);
          this.alertSuccess = false;
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      )
    }
  }

}
