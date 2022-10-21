import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from './../interfaces/auth';
import { ExtratoPositivoNegativo } from '../interfaces/extrato-positivo-negativo';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  saldo: number | null;
  extratoPositivoNegativo: ExtratoPositivoNegativo;
  auth: Auth;
  apiLoaded: Observable<boolean>;

  constructor(private authService: AuthService, httpClient: HttpClient) {
    this.auth = this.authService.getAuth();
    this.authService.getExtratoPositivoNegativo().subscribe((extratoPositivoNegativo: ExtratoPositivoNegativo) => this.extratoPositivoNegativo = extratoPositivoNegativo);
    this.authService.getSaldo().subscribe((saldo: number) => this.saldo = saldo);
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyD_vG381UO3kxIH2h-LcnMKAULg9uN4gTc', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

}
