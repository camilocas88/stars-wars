import { DOCUMENT } from '@angular/common';
import { Component, effect, HostBinding, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
})
export class NavbarComponent {
  @HostBinding('class') readonly class = 'app-navbar';
  isDarkMode = signal(false);
  private readonly _document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      this._document.body.classList.toggle('dark-mode', this.isDarkMode());
    });
  }

  toggleSidenav(sidenav: MatSidenav): void {
    sidenav.toggle();
  }
}
