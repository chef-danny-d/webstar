import { Component } from '@angular/core';
import { Character } from './types';

@Component({
	selector: 'app-character',
	templateUrl: './character.component.html',
	styleUrls: ['./character.component.scss'],
})
export class CharacterComponent {
	data: Character[] = [];
	constructor() {}

	ngOnInit(): void {
		// fetch list of characters from the API using the token in local storage
		fetch(
			'https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Applicant-Id': 'MR8wyPTU',
					'Application-Authorization': `Bearer ${localStorage.getItem(
						'token'
					)}`,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				this.data = data.characters;
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
