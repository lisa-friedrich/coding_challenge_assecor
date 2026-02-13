import { Component, inject, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, RouterLink],
})
export class HeaderComponent {
  protected readonly router = inject(Router);
  readonly openForm = output<void>();
}

