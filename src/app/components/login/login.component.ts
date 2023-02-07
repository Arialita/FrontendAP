import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  isLoggedIn:boolean =false;
  constructor(
    private fb: FormBuilder, private auth: AuthService, private router: Router
    ){}

  ngOnInit(): void {
   this.loginForm = this.fb.group ({
    email : ['', [Validators.required, Validators.email]],
    password : ['',Validators.required],
   })
   this.auth.isLoggedIn$.subscribe({next:data =>{this.isLoggedIn = data; if(this.isLoggedIn){this.router.navigate([''])}}})
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

  onSubmit(event:Event){
    event.preventDefault;
    this.auth.iniciarSesion(this.loginForm.value).subscribe(
      {next: () => this.router.navigate(['/home']),
      error: () => alert('Usuario y/o contraseña incorrectos')
      }
    )
  }

}
