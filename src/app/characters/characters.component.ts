import { Component, Input } from '@angular/core';
import { Character } from './types';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Component({
	selector: 'app-character',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss'],
	providers: [HeroService],
})
export class CharactersComponent {
	chars$: Observable<{
		characters: Character[];
	}> = new Observable();
	currentCharacter: Character | null = null;
	chars: Character[] = [];
	authenticated = false;

	constructor(
		private readonly route: ActivatedRoute,
		private service: HeroService,
		private router: Router,
		private tokenService: TokenService
	) {}

	getCharacterByID(ID: string): Character | null {
		if (!this.chars) {
			return null;
		} else {
			return this.chars.find((character) => character.id === ID) || null;
		}
	}

	ngOnInit(): void {
		if (!this.tokenService.getToken()) {
			this.router.navigate(['/']);
		}
		// the returned data is a single object of arrays, so we need to destructure it to get the characters array
		this.chars$ = this.service.getCharacters();
		this.chars$.subscribe((data) => {
			this.currentCharacter = data.characters[0];
			this.chars = data.characters;
		});

		// get the ID query param from the URL and use it to find the character from the array of characters
		this.route.queryParams.subscribe((params) => {
			const id = params['id'];
			if (id) {
				const character = this.getCharacterByID(id);
				this.currentCharacter = character;
			}
		});
	}
}
