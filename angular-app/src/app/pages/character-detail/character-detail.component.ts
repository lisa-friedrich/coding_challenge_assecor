import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppStateService, Character, Film, Planet } from '../../state/app-state.service';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AppModalComponent } from '../../components/app-modal/app-modal.component';
import { AppFormModalComponent, FormType } from '../../components/app-form-modal/app-form-modal.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AppButtonComponent, AppModalComponent, AppFormModalComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: '../../styles/detail-layout.scss',
})
export class CharacterDetailComponent {
  private readonly appState = inject(AppStateService);
  private readonly route = inject(ActivatedRoute);
  readonly modalOpen = signal(false);
  readonly modalType = signal<FormType>('character');
  readonly character = computed<Character | undefined>(() => this.appState.characters().find((character) => character.id === Number(this.route.snapshot.paramMap.get('id'))));
  readonly films = computed<Film[]>(() => {
    const charId = Number(this.route.snapshot.paramMap.get('id'));
    return this.appState.films().filter((f) => f.characterIds.includes(charId));
  });

  readonly homeworld = computed<Planet | undefined>(() =>
    this.appState
      .planets()
      .find((p) => p.id === Number(this.route.snapshot.paramMap.get('id'))),
  );

  getHeight(height: string): string {
    const heightNumber = Number(height);
    if (heightNumber > 100) {
      return (heightNumber / 100).toFixed(2);
    }
    return height;
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
