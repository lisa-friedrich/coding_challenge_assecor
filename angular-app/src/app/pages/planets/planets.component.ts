import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AppStateService } from '../../state/app-state.service';
import { SwapiService } from '../../services/swapi.service';
import { AppInfoBoxComponent } from '../../components/app-info-box/app-info-box.component';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [CommonModule, AppInfoBoxComponent],
  templateUrl: './planets.component.html',
})
export class PlanetsComponent implements OnInit {
  private readonly appState = inject(AppStateService);
  private readonly swapi = inject(SwapiService);

  readonly planets = this.appState.planets;
  readonly loading = this.appState.loading;
  readonly error = this.appState.error;

  ngOnInit(): void {
    if (!this.planets().length) {
      this.swapi.loadPlanets();
    }
  }
}
