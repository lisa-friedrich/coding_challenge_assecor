import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AppStateService } from '../../state/app-state.service';
import { SwapiService } from '../../services/swapi.service';
import { AppInfoBoxComponent } from '../../components/app-info-box/app-info-box.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, AppInfoBoxComponent],
  templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {
  private readonly appState = inject(AppStateService);
  private readonly swapi = inject(SwapiService);

  readonly characters = this.appState.characters;
  readonly loading = this.appState.loading;
  readonly error = this.appState.error;

  ngOnInit(): void {
    if (!this.characters().length) {
      this.swapi.loadCharacters();
    }
  }
}
