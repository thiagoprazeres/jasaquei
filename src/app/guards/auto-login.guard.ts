import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
	constructor(private authService: AuthService, private router: Router) { }
	canLoad(): boolean {
		if (this.authService.isAuthenticated) {
			this.router.navigateByUrl('/tabs', { replaceUrl: true });
		} else {
			return true;
		}
	}
}
