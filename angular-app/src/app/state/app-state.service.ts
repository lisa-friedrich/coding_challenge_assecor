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
  films: Film[];
  characters: Character[];
}

export interface AppState {
  films: Film[];
  characters: Character[];
  planets: Planet[];
  selectedFilmId: number | null;
  selectedCharacterId: number | null;
  selectedPlanetId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  films: [],
  characters: [],
  planets: [],
  selectedFilmId: null,
  selectedCharacterId: null,
  selectedPlanetId: null,
  loading: false,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly _state = signal<AppState>(initialState);

  // Voller State (readonly)
  readonly state = this._state.asReadonly();

  // Selektoren
  readonly films = computed(() => this._state().films);
  readonly characters = computed(() => this._state().characters);
  readonly planets = computed(() => this._state().planets);
  readonly selectedFilmId = computed(() => this._state().selectedFilmId);
  readonly loading = computed(() => this._state().loading);
  readonly error = computed(() => this._state().error);

  // Mutationen
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

  setSelectedFilm(id: number | null): void {
    this._state.update((state) => ({
      ...state,
      selectedFilmId: id,
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

