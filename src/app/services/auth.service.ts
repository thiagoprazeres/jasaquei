import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login (login, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-login': login,
        'x-password': password
      })
    };
    return this.http.get(environment.webapiurl + '/GetAccessTokenWebMobile', httpOptions);
  }
}
