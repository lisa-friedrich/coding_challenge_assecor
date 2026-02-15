import { Injectable, computed, signal } from '@angular/core';

export interface Film {
  id: number;
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
  characterIds: number[];
  planetIds: number[];
}

export interface Character {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  filmIds: number[];
  planetIds: number[];
}

export interface Planet {
  id: number;
  name: string;
  terrain: string;
  population: string;
  climate: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  filmIds: number[];
  residentIds: number[];
}

export interface AppState {
  films: Film[];
  characters: Character[];
  planets: Planet[];
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  films: [],
  characters: [],
  planets: [],
  loading: false,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly _state = signal<AppState>(initialState);

  readonly films = computed(() => this._state().films);
  readonly characters = computed(() => this._state().characters);
  readonly planets = computed(() => this._state().planets);
  readonly loading = computed(() => this._state().loading);
  readonly error = computed(() => this._state().error);

  setFilms(films: Film[]): void {
    this._state.update((state) => ({
      ...state,
      films,
    }));
  }

  setCharacters(characters: Character[]): void {
    this._state.update((state) => ({
      ...state,
      characters,
    }));
  }

  setPlanets(planets: Planet[]): void {
    this._state.update((state) => ({
      ...state,
      planets,
    }));
  }

  setLoading(loading: boolean): void {
    this._state.update((state) => ({
      ...state,
      loading,
    }));
  }

  setError(error: string | null): void {
    this._state.update((state) => ({
      ...state,
      error,
    }));
  }
}

