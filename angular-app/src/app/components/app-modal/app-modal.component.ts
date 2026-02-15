import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.scss',
})
export class AppModalComponent {
  readonly title = input<string>('Formular');
  readonly close = output<void>();

  onBackdropClick(): void {
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
