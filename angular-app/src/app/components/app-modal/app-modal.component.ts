import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.scss',
})
export class AppModalComponent {
  /** Titel der Modal-Überschrift */
  readonly title = input<string>('Formular');
  /** Schließen (Klick auf Overlay oder X) */
  readonly close = output<void>();

  onBackdropClick(): void {
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
