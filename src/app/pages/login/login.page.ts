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
    login: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  constructor() { }

  ngOnInit() {
  }

  login() {

    const myHeaders: Headers = new Headers();
    myHeaders.append("x-login", this.loginForm.value.login);
    myHeaders.append("x-password", this.loginForm.value.password);
    myHeaders.append("Cookie", "SRVGROUP=common");

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.jasaquei.com.br/GetAccessTokenWebMobile", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => {
        console.log('error', error);
        alert('Ocorreu um erro! Tente novamente');
      });
  }

}
