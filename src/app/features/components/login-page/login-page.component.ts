import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterCategoriesService } from '../../../services/filter-categories.service';

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
  showSignupForm: boolean = false;
  error: boolean = false;
  success: boolean = false;

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


  constructor(private fb: FormBuilder, private categoriesService: FilterCategoriesService) {
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
      console.log(this.loginForm.value);
    }
  }

  onSubmitSignup(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // Simulate success
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 5000);
    }
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
}
