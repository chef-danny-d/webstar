import { TokenService } from "../services/token.service";
import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Application-Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private token: TokenService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
    // Clone the request to add the new header with the token to authenticate the request
		let authReq = request;
		const token = this.token.getToken();
		if (token != null) {
			authReq = request.clone({
				headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
			});
		}
		return next.handle(authReq);
	}
}
