import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, reduce, tap } from 'rxjs/operators';
import { expand } from 'rxjs/operators';
import { forkJoin, merge, Observable, of } from 'rxjs';
import { EMPTY } from 'rxjs';
import { AppStateService, Film, Character, Planet } from '../state/app-state.service';

interface SwapiListResponse<T> {
  results: T[];
}

interface SwapiPaginatedResponse<T> {
  results: T[];
  next: string | null;
}

interface SwapiFilm {
  episode_id: number;
  title: string;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
  characters: string[];
  planets: string[];
}

interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  url: string;
  films: string[];
}

interface SwapiPlanet {
  name: string;
  url: string;
  terrain: string;
  population: string;
  climate: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  films: string[];
  residents: string[];
}

function idFromUrl(url: string): number {
  const part = url.replace(/\/$/, '').split('/').pop();
  return part ? parseInt(part, 10) || 0 : 0;
}

const BASE = 'https://swapi.dev/api';

@Injectable({ providedIn: 'root' })
export class SwapiService {
  private readonly http = inject(HttpClient);
  private readonly state = inject(AppStateService);

  private getFirstPagePeople$() {
    return this.http
      .get<SwapiPaginatedResponse<SwapiPerson>>(`${BASE}/people/`)
      .pipe(
        map((res) =>
          res.results.map(
            (p) =>
              ({
                id: idFromUrl(p.url),
                name: p.name,
                height: p.height,
                mass: p.mass,
                hair_color: p.hair_color,
                eye_color: p.eye_color,
                birth_year: p.birth_year,
                gender: p.gender,
                filmIds: p.films.map((url) => idFromUrl(url)),
                planetIds: p.homeworld ? [idFromUrl(p.homeworld)] : [],
              } as Character),
          ),
        ),
      );
  }

  private getFirstPagePlanets$() {
    return this.http
      .get<SwapiPaginatedResponse<SwapiPlanet>>(`${BASE}/planets/`)
      .pipe(
        map((res) =>
          res.results.map((p) => ({
            id: idFromUrl(p.url),
            name: p.name,
            terrain: p.terrain,
            population: p.population,
            climate: p.climate,
            rotation_period: p.rotation_period,
            orbital_period: p.orbital_period,
            diameter: p.diameter,
            filmIds: p.films.map((url) => idFromUrl(url)),
            residentIds: p.residents.map((url) => idFromUrl(url)),
          } as Planet)),
        ),
      );
  }

  private loadAllPeople$() {
    return this.http
      .get<SwapiPaginatedResponse<SwapiPerson>>(`${BASE}/people/`)
      .pipe(
        expand((res) =>
          res.next ? this.http.get<SwapiPaginatedResponse<SwapiPerson>>(res.next) : EMPTY,
        ),
        reduce((acc: SwapiPerson[], res) => acc.concat(res.results), []),
        map((persons) =>
          persons.map(
            (p) =>
              ({
                id: idFromUrl(p.url),
                name: p.name,
                height: p.height,
                mass: p.mass,
                hair_color: p.hair_color,
                eye_color: p.eye_color,
                birth_year: p.birth_year,
                gender: p.gender,
                filmIds: p.films.map((url) => idFromUrl(url)),
                planetIds: p.homeworld ? [idFromUrl(p.homeworld)] : [],
              } as Character),
          ),
        ),
      );
  }

  private loadAllPlanets$() {
    return this.http
      .get<SwapiPaginatedResponse<SwapiPlanet>>(`${BASE}/planets/`)
      .pipe(
        expand((res) =>
          res.next ? this.http.get<SwapiPaginatedResponse<SwapiPlanet>>(res.next) : EMPTY,
        ),
        reduce((acc: SwapiPlanet[], res) => acc.concat(res.results), []),
        map((planets) =>
          planets.map((p) => ({ id: idFromUrl(p.url), name: p.name, terrain: p.terrain, population: p.population, climate: p.climate, rotation_period: p.rotation_period, orbital_period: p.orbital_period, diameter: p.diameter, filmIds: p.films.map((url) => idFromUrl(url)), residentIds: p.residents.map((url) => idFromUrl(url)) } as Planet)),
        ),
      );
  }

  loadAppData(): Observable<void> {
    if (this.state.films().length > 0) {
      this.state.setLoading(false);
      return of(undefined);
    }

    this.state.setLoading(true);
    this.state.setError(null);

    const firstLoad$ = forkJoin({
      films: this.http.get<SwapiListResponse<SwapiFilm>>(`${BASE}/films/`),
      people: this.getFirstPagePeople$(),
      planets: this.getFirstPagePlanets$(),
    }).pipe(
      map(({ films, people, planets }) => {
        const chars = people as Character[];
        const plan = planets as Planet[];
        const filmList = films.results
          .sort((a, b) => a.episode_id - b.episode_id)
          .map<Film>((f, i) => ({
            id: i + 1,
            title: f.title,
            episode_id: f.episode_id,
            director: f.director,
            producer: f.producer,
            release_date: f.release_date,
            opening_crawl: f.opening_crawl,
            characterIds: f.characters.map((url) => idFromUrl(url)),
            planetIds: f.planets.map((url) => idFromUrl(url)),
          }));
        return { films: filmList, characters: chars, planets: plan };
      }),
      tap(({ films, characters, planets }) => {
        this.state.setFilms(films);
        this.state.setCharacters(characters);
        this.state.setPlanets(planets);
        this.state.setLoading(false);
      }),
      catchError((err) => {
        this.state.setLoading(false);
        this.state.setError('Daten konnten nicht geladen werden.');
        console.error(err);
        throw err;
      }),
      map(() => undefined as void),
    );

    const backgroundLoad$ = forkJoin({
      people: this.loadAllPeople$(),
      planets: this.loadAllPlanets$(),
    }).pipe(
      catchError((err) => {
        console.error('Hintergrund-Laden fehlgeschlagen:', err);
        return EMPTY;
      }),
      tap(({ people, planets }) => {
        if (people) {
          this.state.setCharacters(people as Character[]);
        }
        if (planets) {
          this.state.setPlanets(planets as Planet[]);
        }
      }),
      map(() => undefined as void),
    );

    return merge(firstLoad$, backgroundLoad$);
  }
}
