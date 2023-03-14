import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'webstar';
	authenticated = false;
	username?: string;

	constructor(private tokenService: TokenService) {}

	ngOnInit(): void {
		this.authenticated = !!this.tokenService.getToken();

		if (this.authenticated) {
			const user = this.tokenService.getUser();
			this.username = user.username;
		}
	}
}
