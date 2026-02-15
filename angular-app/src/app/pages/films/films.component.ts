import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AppStateService } from '../../state/app-state.service';
import { SwapiService } from '../../services/swapi.service';
import { AppInfoBoxComponent } from '../../components/app-info-box/app-info-box.component';
import { AppLoaderComponent } from '../../components/app-loader/app-loader.component';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, AppInfoBoxComponent, AppLoaderComponent],
  templateUrl: './films.component.html',
})
export class FilmsComponent  {
  private readonly appState = inject(AppStateService);
  private readonly swapi = inject(SwapiService);

  readonly films = this.appState.films;
  readonly loading = this.appState.loading;
  readonly error = this.appState.error;
}
