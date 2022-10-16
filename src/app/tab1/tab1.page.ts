import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from './../interfaces/auth';


export interface ExtratoPositivoNegativo {
  outSaldoPositivo: number;
  outSaldoNegativo: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  extratoPositivoNegativo: ExtratoPositivoNegativo;
  auth: Auth;

  constructor(private authService: AuthService) {
    this.auth = this.authService.getAuth();
    this.authService.getExtratoPositivoNegativo().subscribe((extratoPositivoNegativo: ExtratoPositivoNegativo) => this.extratoPositivoNegativo = extratoPositivoNegativo);
  }

}
