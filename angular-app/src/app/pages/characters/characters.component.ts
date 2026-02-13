import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppStateService } from '../../state/app-state.service';
import { AppInfoBoxComponent } from '../../components/app-info-box/app-info-box.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, AppInfoBoxComponent],
  templateUrl: './characters.component.html',
})
export class CharactersComponent {
  private readonly appState = inject(AppStateService);

  readonly characters = this.appState.characters;
  readonly loading = this.appState.loading;
  readonly error = this.appState.error;
}
