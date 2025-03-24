import { Injectable, effect, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Character } from '../domain/models/character.model';
import { STARWARS_PORT_TOKEN } from '../domain/ports/star-wars.port';

@Injectable({ providedIn: 'root' })
export class GetCharactersUsecase {
  private readonly starWarsPort = inject(STARWARS_PORT_TOKEN);

  private readonly pageSignal = signal<number>(1);
  private readonly searchSignal = signal<string>('');

  charactersSignal = signal<Character[]>([]);
  loading = signal<boolean>(false);
  errorSignal = signal<string | null>(null);

  constructor() {
    effect(() => {
      const page = this.pageSignal();
      const search = this.searchSignal();

      this.loading.set(true);
      this.errorSignal.set(null);

      this.starWarsPort.getCharacters(page, search).subscribe({
        next: (characters: Character[]) => {
          if (page === 1) {
            this.charactersSignal.set(characters);
          } else {
            this.charactersSignal.set([
              ...this.charactersSignal(),
              ...characters,
            ]);
          }
          this.loading.set(false);
        },
        error: (err: Error) => {
          this.charactersSignal.set([]);
          this.errorSignal.set(err.message || 'Error fetching characters');
          this.loading.set(false);
        },
      });
    });
  }

  execute(page: number = 1, search: string = ''): void {
    this.pageSignal.set(page);
    this.searchSignal.set(search);
  }

  loadMore(): void {
    this.pageSignal.update((current) => current + 1);
  }

  fetchCharacterDetail(uid: string): Observable<Character> {
    return this.starWarsPort.getCharacterById(uid).pipe(
      catchError((error: Error) => {
        console.error('Error fetching character detail:', error);
        return of(null as any);
      })
    );
  }
}
