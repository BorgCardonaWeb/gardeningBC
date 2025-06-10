import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { UserManagementService } from '../../../services/user-management.service';
import { userModel } from '../../models/models';
import countriesJson from '../../../../assets/data/country-codes.json';
import { Router } from '@angular/router';

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
  forgotPasswordForm: FormGroup;

  showSignupForm = false;
  alertForgotSUccess = false;
  error = false;
  alertSuccess = false;
  loading = false;
  showForgotPassword = false;
  loadingForgotPassword = false;
  txtAlertError = "";

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
    private userManagementService: UserManagementService,
    private router: Router) {

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });


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
      postalCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3}\s?\d{4}$/)]],
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
    this.countryCodes = countriesJson;
  }

  hideForgotPassword() {
    this.showForgotPassword = false;
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      this.loginUser(this.loginForm.value.email, this.loginForm.value.password,);
    }
  }

  onForgotPassword(): void {
    this.loadingForgotPassword = true;
    if (this.forgotPasswordForm.valid) {
      this.userManagementService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(
        data => {
          this.loadingForgotPassword = false;
          this.alertForgotSUccess = true;
          setTimeout(() => {
            this.alertForgotSUccess = false;
          }, 7000);
        },
        error => {
          this.loadingForgotPassword = false;
          this.errorManagement("User not found");
        });
    }
  }

  loginUser(emailData: string, passwordaData: string) {
    this.userManagementService.login({ email: emailData, password: passwordaData }).subscribe(response => {
      this.categoriesService.updateUserLoginData(response.user);
      this.generalInfoServiceService.closeModal();
      this.loading = false
      this.router.navigate(['']);
    }, error => {
      this.errorManagement("Invalid username or password");
    });

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
    if (this.signupForm.valid) {
      this.error = false;
      let userData: userModel = {
        name: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        address: this.signupForm.value.address,
        city: this.signupForm.value.city,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phoneNumber: this.signupForm.value.phoneNumber,
        postalCode: this.signupForm.value.postalCode,
        phonePrefix: this.signupForm.value.phonePrefix
      }
      this.createUser(userData);
    }
  }

  createUser(userData: any) {
    this.userManagementService.register(userData).subscribe(
      data => {
        this.alertSuccess = true;
        this.toggleSignupForm();
        this.hideSuccessAlert();
      },
      error => {
        if (error.status === 400) {
          this.errorManagement('This email is already registered');
        } else {
          this.errorManagement('An unexpected error occurred while creating the account');
        }

      }
    )
  }

  hideSuccessAlert() {
    setTimeout(() => {
      this.alertSuccess = false;
    }, 5000);
  }

  errorManagement(msmError: string) {
    this.txtAlertError = msmError;
    this.alertSuccess = false;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }


  forgotPassword() {
    this.showForgotPassword = true;
  }

}
