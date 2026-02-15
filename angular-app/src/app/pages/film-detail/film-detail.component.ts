import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AppStateService, Character, Film, Planet } from '../../state/app-state.service';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AppModalComponent } from '../../components/app-modal/app-modal.component';
import { AppFormModalComponent, FormType } from '../../components/app-form-modal/app-form-modal.component';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AppButtonComponent, AppModalComponent, AppFormModalComponent],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss',
})
export class FilmDetailComponent {
  private readonly appState = inject(AppStateService);
  private readonly route = inject(ActivatedRoute);
  readonly modalOpen = signal(false);
  readonly modalType = signal<FormType>('film');

  private readonly routeId = toSignal(
    this.route.paramMap.pipe(map((p) => Number(p.get('id')) ?? 0)),
    { initialValue: 0 },
  );

  readonly film = computed<Film | undefined>(() =>
    this.appState.films().find((f) => f.id === this.routeId()),
  );

  readonly characters = computed<Character[]>(() => {
    const f = this.film();
    if (!f) return [];
    return this.appState.characters().filter((c) => f.characterIds.includes(c.id));
  });

  readonly planets = computed<Planet[]>(() => {
    const f = this.film();
    if (!f) return [];
    return this.appState.planets().filter((p) => f.planetIds.includes(p.id));
  });


  getEpisode(episodeId: number): string {
    switch (episodeId) {
      case 1:
        return 'I';
      case 2:
        return 'II';
      case 3:
        return 'III';
      case 4:
        return 'IV';
      case 5:
        return 'V';
      case 6:
        return 'VI';
      default:
        return '';
    }
  }

  openModal(type: FormType): void {
    this.modalType.set(type);
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  onFormSubmit(data: unknown): void {
    console.log('Formular abgesendet:', this.modalType(), data);
    this.closeModal();
  }
}


