import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/components/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'films',
    loadComponent: () =>
      import('./presentation/components/films/films.component').then(
        (m) => m.FilmsComponent
      ),
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./presentation/components/characters/characters.component').then(
        (m) => m.CharactersComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
