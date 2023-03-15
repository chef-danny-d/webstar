import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USER_KEY = 'auth-user';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
  /**
   * Sign out the user by clearing the session storage
   */
	signOut(): void {
		window.sessionStorage.clear();
	}

  /**
   * Upsert the token with an updated token
   * @param token
   */
	public saveToken(token: string): void {
		window.sessionStorage.removeItem(TOKEN_KEY);
		window.sessionStorage.setItem(TOKEN_KEY, token);
	}

  /**
   * Get the token from the session storage and return it as a string
   */
	public getToken(): string | null {
		return window.sessionStorage.getItem(TOKEN_KEY);
	}

  /**
   * Save the user JSON object to the session storage as a string
   * @param user
   */
	public saveUser(user: any): void {
		window.sessionStorage.removeItem(USER_KEY);
		window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
	}

  /**
   * Get the user string from the session storage and return it as a JSON object
   */
	public getUser(): any {
		const user = window.sessionStorage.getItem(USER_KEY);
		if (user) {
			return JSON.parse(user);
		}

		return {};
	}
}
