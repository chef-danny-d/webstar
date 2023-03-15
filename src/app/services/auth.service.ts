import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../env/environment";

const AUTH_API =
	'https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'Applicant-Id': environment.apiKey,
	}),
};

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

  /**
   * Login the user with the given credentials and return the token along with the user profile
   * The authentication is completed by the API endpoint
   * @param username
   * @param password
   */
	login(username: string, password: string): Observable<any> {
		return this.http.post(
			AUTH_API,
			{
				username,
				password,
			},
			httpOptions
		);
	}
}
