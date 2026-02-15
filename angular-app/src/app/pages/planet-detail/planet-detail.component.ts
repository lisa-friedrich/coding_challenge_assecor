import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AppStateService, Character, Film, Planet } from '../../state/app-state.service';
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
  private readonly route = inject(ActivatedRoute);

  private readonly routeId = toSignal(
    this.route.paramMap.pipe(map((p) => Number(p.get('id')) ?? 0)),
    { initialValue: 0 },
  );

  readonly planet = computed<Planet | undefined>(() =>
    this.appState.planets().find((p) => p.id === this.routeId()),
  );

  readonly characters = computed<Character[]>(() =>
    this.appState.characters().filter((c) => this.planet()?.residentIds.includes(c.id) ?? false),
  );
  readonly films = computed<Film[]>(() =>
    this.appState.films().filter((f) => this.planet()?.filmIds.includes(f.id) ?? false),
  );
}
