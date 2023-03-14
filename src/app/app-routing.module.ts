import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CharactersComponent } from './characters/characters.component';

const routes: Routes = [
	{ path: '', component: AuthComponent },
	{ path: 'characters', component: CharactersComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
