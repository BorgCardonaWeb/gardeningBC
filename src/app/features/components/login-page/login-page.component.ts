import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { userkeystorage } from '../../../../assets/emuns/const';

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

  @Input() showGeneralInf: boolean = false;
  countryCodes: any[] = [];

  get isValidConfirm() {
    if(this.signupForm){
      const password = this.signupForm.value['password'];
      const confirmPassword = this.signupForm.value['confirmPassword'];
      if (password !== confirmPassword) {
        return false
      } else {
        return true;
      }
    } else{
      return true;
    }
  }


  constructor(private fb: FormBuilder, private categoriesService: FilterCategoriesService, private generalInfoServiceService: GeneralInfoServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$')
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
        console.error('Error loading country codes', error);
      }
    );
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      this.generateMockStogareUser();
    }
  }

  generateMockStogareUser(){
    console.log("entra a la funcion desde el login")
    let data = [{
      name: "Xiomara Pulido",
      id: "123"
    }]

    this.categoriesService.setDataStorage(userkeystorage, data);
    this.categoriesService.updateUserLoginData(data);
    setTimeout(() => {
      this.generalInfoServiceService.closeModal();
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
      this.alertSuccess = true;
      setTimeout(() => {
        this.toggleSignupForm();
      }, 500);
      setTimeout(() => {
        this.alertSuccess = false;
      }, 5000);
    }
  }

}
