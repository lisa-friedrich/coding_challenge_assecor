import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppStateService } from '../../state/app-state.service';
import { AppInfoBoxComponent } from '../../components/app-info-box/app-info-box.component';
import { AppLoaderComponent } from '../../components/app-loader/app-loader.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, AppInfoBoxComponent, AppLoaderComponent],
  templateUrl: './characters.component.html',
})
export class CharactersComponent {
  private readonly appState = inject(AppStateService);

  readonly characters = this.appState.characters;
  readonly loading = this.appState.loading;
  readonly error = this.appState.error;
}
