import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-info-box.component.html',
  styleUrl: './app-info-box.component.scss',
})
export class AppInfoBoxComponent {
  readonly routerLink = input.required<string | string[]>();
}

