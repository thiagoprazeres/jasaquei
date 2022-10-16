import { Injectable, Provider } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Auth } from '../interfaces/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private auth: Auth | null = null;
  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.loadAuth();
  }

  async loadAuth() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.getAuth().then((auth: Auth) => {
      if (auth && auth.token && auth.xPessoa) {
        this.auth = auth;
        this.isAuthenticated.next(true);
      }
      else {
        this.isAuthenticated.next(false);
      }
    }, () => this.isAuthenticated.next(false));
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
    this.isAuthenticated.next(true);
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
