import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../characters/types';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HeroService {
	constructor(private http: HttpClient) {}

	getCharacters(): Observable<any> {
		return this.http.get<{ characters: Character[] }>(
			'https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/',
			{
				headers: {
					'Content-Type': 'application/json',
					'Applicant-Id': 'MR8wyPTU',
					'Application-Authorization': `Bearer ${localStorage.getItem(
						'token'
					)}`,
				},
				responseType: 'json',
			}
		);
	}
}
