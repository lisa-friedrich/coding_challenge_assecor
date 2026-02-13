import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppStateService, Character, Film, Planet } from '../../state/app-state.service';
import { SwapiService } from '../../services/swapi.service';
import { AppButtonComponent } from '../../components/app-button/app-button.component';

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [RouterLink, AppButtonComponent],
  templateUrl: './planet-detail.component.html',
  styleUrl: '../../styles/detail-layout.scss',
})
export class PlanetDetailComponent {
  private readonly appState = inject(AppStateService);
  private readonly swapi = inject(SwapiService);
  private readonly route = inject(ActivatedRoute);

  readonly planet = computed<Planet | undefined>(() =>
    this.appState
      .planets()
      .find((p) => p.id === Number(this.route.snapshot.paramMap.get('id'))),
  );

  readonly characters = computed<Character[] | undefined>(() => this.appState.characters().filter((character) => this.planet()?.characters.find((c) => c.id === character.id)));
  readonly films = computed<Film[] | undefined>(() => this.appState.films().filter((film) => this.planet()?.films.find((f) => f.id === film.id)));
}
