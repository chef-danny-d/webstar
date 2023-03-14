import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';
import { Component, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
	//Form variables
	registerForm: any = FormGroup;
	submitted = false;
	error: {
		cause: string;
		message: string;
	} | null = null;
	authenticated = false;
	user = null;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private tokenService: TokenService
	) {}
	@Output() currentUser = null;

	public logout(): void {
		this.tokenService.signOut();
		this.router.navigate(['/']);
		window.location.reload();
	}

	//Add user form actions
	get f() {
		return this.registerForm.controls;
	}
	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}
		//True if all the fields are filled
		if (this.submitted) {
			console.log(this.registerForm.value);

			this.authService
				.login(this.registerForm.value.email, this.registerForm.value.password)
				.subscribe(
					(data) => {
						this.tokenService.saveToken(data.token);
						this.tokenService.saveUser(data.user);

						this.authenticated = true;
						this.error = null;
						window.location.reload();
					},
					(err) => {
						this.error = {
							cause: 'Authentication failed',
							message: err.error,
						};
					}
				);
		}
	}
	reloadPage(): void {
		window.location.reload();
	}
	ngOnInit() {
		// on load we check to see if there is already a user in the session
		if (this.tokenService.getToken()) {
			this.authenticated = true;
			this.user = this.tokenService.getUser();
			this.router.navigate(['/characters'], {
				queryParams: { id: 'veder' },
			});
		}
		//Add User form validations
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}
}
