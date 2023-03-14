import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API =
	'https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'Applicant-Id': 'MR8wyPTU',
	}),
};

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

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
