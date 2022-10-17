import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth | null = null;

  constructor(private http: HttpClient) {
    if (this.getAuth()) {
      this.auth = this.getAuth();
    } else {
    }
  }

  isAuthenticated(): boolean {
    return this.auth !== null;
  }

  getAccessToken(xLogin, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-login': xLogin,
        'x-password': password
      })
    };
    return this.http.get(environment.webapiurl + '/GetAccessTokenWebMobile', httpOptions);
  }

  setAuth(auth: Auth) {
    this.auth = auth;
    sessionStorage.setItem('auth', JSON.stringify(auth));
  }

  getAuth(): Auth {
    return JSON.parse(sessionStorage.getItem('auth'));
  }

  removeAuth(): void {
    this.auth = null;
    return sessionStorage.clear();
  }

  getSaldo() {
    return this.http.get(environment.webapiurl + '/Saldo');
  }

  getExtratoPositivoNegativo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-dtinicio': '08/09/2022',
        'x-dtfim': '08/09/2022'
      })
    };
    return this.http.get(environment.webapiurl + '/ExtratoPositivoNegativo', httpOptions);
  }
}
