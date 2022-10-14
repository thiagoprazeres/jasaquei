import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.getAuth()) {
      this.authService.getAuth().then((auth: Auth) => {
        this.auth = auth;
        this.authService.getExtratoPositivoNegativo().subscribe((extratoPositivoNegativo: ExtratoPositivoNegativo) => this.extratoPositivoNegativo = extratoPositivoNegativo);
      }).catch(error => console.error(error));
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
