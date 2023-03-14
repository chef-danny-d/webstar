import { Component } from '@angular/core';
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

	constructor(private formBuilder: FormBuilder, private router: Router) {}
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

			fetch(
				'https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/',
				{
					method: 'POST',
					body: JSON.stringify({
						username: this.registerForm.value.email,
						password: this.registerForm.value.password,
					}),
					headers: {
						'Content-Type': 'application/json',
						'Applicant-Id': 'MR8wyPTU',
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					// if we have a token, we are authenticated and we can store the token in local storage
					if (data.token) {
						this.authenticated = true;
						localStorage.setItem('token', data.token);
						// sending our user to the first page of the character list
						this.router.navigate(['/characters'], {
							queryParams: { index: 0 },
						});
					} else {
						throw new Error('Authentication failed');
					}
				})
				.catch((error) => {
					console.log(error);
					this.error = {
						cause: 'Authentication failed',
						message: error.error,
					};
				});
		}
	}
	ngOnInit() {
		//Add User form validations
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}
}
