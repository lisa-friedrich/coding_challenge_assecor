import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  standalone: true,
  templateUrl: './app-info-box.component.html',
  styleUrl: './app-info-box.component.scss',
})
export class AppInfoBoxComponent {
  @Input() routerLink: string | string[] | null = null;
}

