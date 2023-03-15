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
  /**
   * I use an array of characters to store the list of characters since I wasn't sure how to operate on the Observable
   * I'm sure there's a better way to do this, but in an effort to speed things up I went with this approach.
   * Using the Observable allowed me to subscribe to the async data and update the view when the data is ready
    */
	chars: Character[] = [];

	constructor(
		private readonly route: ActivatedRoute,
		private service: HeroService,
		private router: Router,
		private tokenService: TokenService
	) {}

  /**
   * Get a character from the list based on the passed in unique ID
   * If none is found, we return null
   * @param ID
   * @returns {Character | null}
   */
	getCharacterByID(ID: string): Character | null {
		if (!this.chars) {
			return null;
		} else {
			return this.chars.find((character) => character.id === ID) || null;
		}
	}

  /**
   * Get the next character in the list based on the current character
   * If the current character is the last one, we return the first one
   */
	public nextCharacter(): void {
		if (this.currentCharacter) {
			const currentIndex = this.chars.indexOf(this.currentCharacter);
			if (currentIndex === this.chars.length - 1) {
				this.currentCharacter = this.chars[0];
			} else {
				this.currentCharacter = this.chars[currentIndex + 1];
			}
		}
	}

  /**
   * Get the previous character in the list based on the current character
   * If the current character is the first one, we return the last one
   */
	public previousCharacter(): void {
		if (this.currentCharacter) {
			const currentIndex = this.chars.indexOf(this.currentCharacter);
			if (currentIndex === 0) {
				this.currentCharacter = this.chars[this.chars.length - 1];
			} else {
				this.currentCharacter = this.chars[currentIndex - 1];
			}
		}
	}

	ngOnInit(): void {
    // if the user is not logged in, redirect them to the home page
		if (!this.tokenService.getToken()) {
			this.router.navigate(['/']);
		}

    // get the list of characters from the API
		this.chars$ = this.service.getCharacters();
    // subscribe to the Observable and store the data in the array of characters
    // set the current character to the first one in the list
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
