import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  constructor(
    private fb: FormBuilder,
    ){}

  ngOnInit(): void {
   this.loginForm = this.fb.group ({
    email : ['', [Validators.required, Validators.email]],
    password : ['',Validators.required],
   })
   console.log('opened');
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  emailClass (){
    return {
      'valid-input': !this.email.invalid,
      'invalid-input': (this.email.invalid && this.email.dirty)
    }
  }

  passwordClass(){
    return {
      'valid-input': !this.password.invalid,
      'invalid-input': (this.password.invalid && this.password.dirty)
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }

}
