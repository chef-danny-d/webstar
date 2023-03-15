import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../characters/types';
import { Observable } from 'rxjs';
import { environment } from "../../env/environment";

@Injectable({
	providedIn: 'root',
})
export class HeroService {
	constructor(private http: HttpClient) {}

  /**
   * Get the list of Star Wars characters from the API endpoint
   *  @returns {Observable<Character[] | unknown>}
   */
	getCharacters(): Observable<any> {
		return this.http.get<{ characters: Character[] }>(
			'https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/',
			{
				headers: {
					'Content-Type': 'application/json',
					'Applicant-Id': environment.apiKey,
					'Application-Authorization': `Bearer ${localStorage.getItem(
						'token'
					)}`,
				},
				responseType: 'json',
			}
		);
	}
}
