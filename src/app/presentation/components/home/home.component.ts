import { Component, HostBinding, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  @HostBinding('class') class = 'app-home';

  private readonly router = inject(Router);

  navigateToFilms() {
    this.router.navigate(['/films']);
  }
}
