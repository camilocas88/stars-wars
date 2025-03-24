import { Component } from '@angular/core';
import { NavbarComponent } from './presentation/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [ NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {}
