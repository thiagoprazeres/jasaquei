import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginForm } from 'src/app/interfaces/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup<LoginForm>({
    login: new FormControl('', {nonNullable: true}),
    password: new FormControl('', {nonNullable: true}),
  });

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.warn('Login and password', this.loginForm.value);
    
  }

}
