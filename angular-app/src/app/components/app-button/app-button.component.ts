import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss',
})
export class AppButtonComponent {
  /** Button-Typ (nur wenn kein routerLink gesetzt) */
  readonly type = input<'button' | 'submit'>('button');
  /** Deaktiviert den Button */
  readonly disabled = input<boolean>(false);
  /** Optional: als Link rendern, z. B. ['/films'] */
  readonly routerLink = input<string | string[] | null>(null);
  /** Label-Text (empfohlen bei dynamischem Text z. B. in @for), sonst ng-content */
  readonly label = input<string | null>(null);
  /** Click-Event (nur wenn kein routerLink gesetzt) */
  readonly click = output<void>();
}
