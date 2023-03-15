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

  /**
   * Creating a getter function for the form fields that returns an object with all the values of the form fields
   */
	get f() {
		return this.registerForm.controls;
	}

  /**
   * Initialize the form submission process
   * If the form is invalid, we stop here
   * If the form is valid, we call the login method from the AuthService
   * If the login is successful, we save the token and user data in the session storage
   * If the login is unsuccessful, we display an error message
   */
	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}
		//True if all the fields are filled
		if (this.submitted) {
			this.authService
				.login(this.registerForm.value.email, this.registerForm.value.password)
				.subscribe(
					(data) => {
						this.tokenService.saveToken(data.token);
						this.tokenService.saveUser(data.user);

						this.authenticated = true;
						this.error = null;
						this.reloadPage()
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
		// on-load we check to see if there is already a user in the session
    // if there is, we redirect to the characters page with the id of the first character
		if (this.tokenService.getToken()) {
			this.authenticated = true;
			this.user = this.tokenService.getUser();
			this.router.navigate(['/characters'], {
				queryParams: { id: 'veder' },
			});
		}
		//Add the form fields and their validators
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}
}
