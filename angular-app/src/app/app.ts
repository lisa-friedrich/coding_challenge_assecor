import { Component, OnInit, inject, signal } from '@angular/core';
import { DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderComponent } from './header/header.component';
import { SwapiService } from './services/swapi.service';
import { AppModalComponent } from './components/app-modal/app-modal.component';
import { AppFormModalComponent } from './components/app-form-modal/app-form-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AppModalComponent, AppFormModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angular-app');
  protected readonly modalOpen = signal(false);
  private readonly swapi = inject(SwapiService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.swapi.loadAppData().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  openFormModal(): void {
    this.modalOpen.set(true);
  }

  closeFormModal(): void {
    this.modalOpen.set(false);
  }
}
