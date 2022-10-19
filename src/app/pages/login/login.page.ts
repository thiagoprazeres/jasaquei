import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/interfaces/auth';
import { LoginForm } from 'src/app/interfaces/login-form';
import { AuthService } from 'src/app/services/auth.service';

export interface Token {
  token: string;
  usuario: string;
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
    xLogin: new FormControl('04305097400', Validators.required),
    password: new FormControl('1234567890', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  get xLogin() { return this.loginForm.get('xLogin'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    this.authService.getAccessToken(this.loginForm.value.xLogin, this.loginForm.value.password).subscribe((data: Token) => {
      console.log(data);
      const auth: Auth = {token: data.token, xPessoa: this.loginForm.value.xLogin, usuario: data.usuario};
      this.authService.setAuth(auth);
      this.router.navigateByUrl('/tabs/tab1');
    }, (error) => {
      console.error(error);
      this.loading = false;
      if (error.error.mensagem) {
        this.mensagem = error.error.mensagem;
      } else if (error.message) {
        this.mensagem = error.message;
      }
    }, () => this.loading = false
    );
  }

}
