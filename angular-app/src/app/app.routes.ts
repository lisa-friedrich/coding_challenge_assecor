import { Routes } from '@angular/router';
import { FilmsComponent } from './pages/films/films.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';

export const routes: Routes = [
  { path: '', component: FilmsComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'films/:id', component: FilmDetailComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'planets', component: PlanetsComponent },
];
