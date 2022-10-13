import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form';
import { AuthService } from 'src/app/services/auth.service';

export interface Token {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;
  mensagem = '';

  loginForm = new FormGroup<LoginForm>({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  get login() {return this.loginForm.get('login');}
  get password() {return this.loginForm.get('password');}

  getAccessToken() {
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe((data: Token) => {
      console.log(data);
      this.router.navigateByUrl('/tabs/tab1');
    }, (error) => {
      console.error(error);
      this.loading = false;
      if(error.error.mensagem) {
        this.mensagem = error.error.mensagem;
      }else if(error.message) {
        this.mensagem = error.message;
      }
    }, () => this.loading = false
    );
  }

}
