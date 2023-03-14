import { Component } from '@angular/core';
import { Character } from './types';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-character',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss'],
	providers: [HeroService],
})
export class CharactersComponent {
	data: Character[] | null = [];
	currentCharacter: Character | null = null;
	constructor(private readonly route: ActivatedRoute, service: HeroService) {
		service.getCharacters().subscribe((data) => {
			this.data = data.characters;
		});
		const heroID: string | null = this.route.snapshot.queryParams['id'];
		if (!heroID) {
			this.currentCharacter = this.getCharacterByID('yoda');
		} else {
			this.currentCharacter = this.getCharacterByID(heroID);
		}
	}

	getCharacterByID(ID: string): Character | null {
		if (!this.data) {
			return null;
		} else {
			return this.data.find((character) => character.id === ID) || null;
		}
	}

	ngOnInit(): void {
		// get the ID query param from the URL and use it to find the character from the array of characters
		this.route.queryParams.subscribe((params) => {
			const id = params['id'];
			if (id) {
				const character = this.getCharacterByID(id);
				this.currentCharacter = character;
			}
		});
	}
	// fetch list of characters from the API using the token in local storage
	async fetchCharacters() {
		try {
			const response = await fetch(
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
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}
}
