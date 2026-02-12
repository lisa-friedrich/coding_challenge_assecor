import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppStateService, Film, Character, Planet } from '../state/app-state.service';

interface SwapiListResponse<T> {
  results: T[];
}

interface SwapiFilm {
  episode_id: number;
  title: string;
  director: string;
  producer: string;
  release_date: string;
}

interface SwapiPerson {
  name: string;
  url: string;
}

interface SwapiPlanet {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private readonly http = inject(HttpClient);
  private readonly state = inject(AppStateService);

  private readonly baseUrl = 'https://swapi.dev/api';

  loadFilms(): void {
    this.state.setLoading(true);
    this.state.setError(null);

    this.http
      .get<SwapiListResponse<SwapiFilm>>(`${this.baseUrl}/films/`)
      .pipe(
        map((res) =>
          res.results
            .sort((a, b) => a.episode_id - b.episode_id)
            .map<Film>((film, index) => ({
              id: index + 1,
              title: film.title,
              director: film.director,
              producer: film.producer,
              release_date: film.release_date,
            })),
        ),
      )
      .subscribe({
        next: (films) => {
          this.state.setFilms(films);
          this.state.setLoading(false);
        },
        error: (err) => {
          this.state.setError('Konnte Filme nicht laden.');
          console.error(err);
          this.state.setLoading(false);
        },
      });
  }

  loadCharacters(): void {
    this.state.setLoading(true);
    this.state.setError(null);

    this.http
      .get<SwapiListResponse<SwapiPerson>>(`${this.baseUrl}/people/`)
      .pipe(
        map((res) =>
          res.results.map<Character>((person, index) => ({
            id: index + 1,
            name: person.name,
          })),
        ),
      )
      .subscribe({
        next: (characters) => {
          this.state.setCharacters(characters);
          this.state.setLoading(false);
        },
        error: (err) => {
          this.state.setError('Konnte Charaktere nicht laden.');
          console.error(err);
          this.state.setLoading(false);
        },
      });
  }

  loadPlanets(): void {
    this.state.setLoading(true);
    this.state.setError(null);

    this.http
      .get<SwapiListResponse<SwapiPlanet>>(`${this.baseUrl}/planets/`)
      .pipe(
        map((res) =>
          res.results.map<Planet>((planet, index) => ({
            id: index + 1,
            name: planet.name,
          })),
        ),
      )
      .subscribe({
        next: (planets) => {
          this.state.setPlanets(planets);
          this.state.setLoading(false);
        },
        error: (err) => {
          this.state.setError('Konnte Planeten nicht laden.');
          console.error(err);
          this.state.setLoading(false);
        },
      });
  }
}

