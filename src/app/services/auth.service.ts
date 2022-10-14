import { Injectable, Provider } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
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
    this._storage?.set('auth', auth);
  }

  getAuth(): Promise<Auth> {
    return this._storage?.get('auth');
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
