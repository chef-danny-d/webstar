import { AuthService } from './../services/auth.service';
import { TokenService } from './../services/token.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	authenticated = false;
	constructor(private router: Router, private tokenService: TokenService) {}
	@Input() currentUser: any;

	public logout(): void {
		this.tokenService.signOut();
		this.router.navigate(['/']);
		window.location.reload();
	}

	ngOnInit(): void {
		// if (!this.authenticated) {
		// 	this.authenticated = this.tokenService.getToken() ? true : false;
		// 	this.currentUser = this.tokenService.getUser();
		// 	window.location.reload();
		// }
		this.authenticated = this.tokenService.getToken() ? true : false;
		this.currentUser = this.tokenService.getUser();
	}
}
