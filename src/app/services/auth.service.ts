import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth | null = null;

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {
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
    this.sessionStorageService.store('auth', auth);
  }

  getAuth(): Auth {
    return this.sessionStorageService.retrieve('auth');
  }

  removeAuth(): void {
    this.auth = null;
		return this.sessionStorageService.clear();
  }

  getSaldo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-pessoa': this.auth.xPessoa,
        'Authorization': 'Bearer ' + this.auth.token
      })
    };
    return this.http.get(environment.webapiurl + '/Saldo', httpOptions);
  }

  getExtratoPositivoNegativo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-pessoa': this.auth.xPessoa,
        'x-dtinicio': '08/09/2022',
        'x-dtfim': '08/09/2022',
        'Authorization': 'Bearer ' + this.auth.token
      })
    };
    return this.http.get(environment.webapiurl + '/ExtratoPositivoNegativo', httpOptions);
  }
}
