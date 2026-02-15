import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export type FormType = 'film' | 'character' | 'planet';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app-form-modal.component.html',
  styleUrl: './app-form-modal.component.scss',
})
export class AppFormModalComponent {
  private readonly fb = inject(FormBuilder);
  readonly cancel = output<void>();
  readonly submit = output<any>();
  
  readonly type = input<FormType>('film');

  readonly filmForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    director: ['', Validators.required],
    producer: ['', Validators.required],
    release_date: ['', Validators.required],
    episode_id: [1, [Validators.required, Validators.min(1), Validators.max(9)]],
    opening_crawl: [''],
  });

  readonly characterForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    height: ['', Validators.required],
    mass: ['', Validators.required],
    hair_color: ['', Validators.required],
    eye_color: ['', Validators.required],
    birth_year: ['', Validators.required],
    gender: ['', Validators.required],
  });

  readonly planetForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  get currentForm() {
    switch (this.type()) {
      case 'film':
        return this.filmForm;
      case 'character':
        return this.characterForm;
      case 'planet':
        return this.planetForm;
      default:
        return this.filmForm;
    }
  }

  onSubmit(): void {
    const form = this.currentForm;
    if (form.valid) {
      this.submit.emit(form.getRawValue());
      form.reset();
    } else {
      form.markAllAsTouched();
    }
  }
}
