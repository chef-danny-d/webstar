import { TokenService } from "../services/token.service";
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

  /**
   * Log out the user by clearing the session storage and redirecting to the home page
   * Trigger a reload after navigation to clear the navbar from the DOM
   */
	public logout(): void {
		this.tokenService.signOut();
		this.router.navigate(['/']);
		window.location.reload();
	}

	ngOnInit(): void {
		this.authenticated = !!this.tokenService.getToken();
		this.currentUser = this.tokenService.getUser();
	}
}
