import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	authenticated = false;
	constructor(private router: Router) {}

	logOut(): void {
		localStorage.removeItem('token');
		this.authenticated = false;
		this.router.navigate(['/']);
	}

	ngOnInit(): void {
		if (!this.authenticated) {
			const token = localStorage.getItem('token');
			if (token) {
				this.authenticated = true;
			}
		}
	}
}
