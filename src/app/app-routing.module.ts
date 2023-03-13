import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CharacterComponent } from './character/character.component';

const routes: Routes = [
	{ path: '', component: AuthComponent },
	{ path: 'characters', component: CharacterComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
