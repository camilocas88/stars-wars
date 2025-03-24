import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Film } from '../domain/models/film.model';
import { STARWARS_PORT_TOKEN } from '../domain/ports/star-wars.port';

@Injectable({ providedIn: 'root' })
export class GetFilmsUsecase {
  private readonly starWarsPort = inject(STARWARS_PORT_TOKEN) as {
    getFilms: (page: number, search?: string) => Observable<Film[]>;
  };

  currentPage = 1;
  private readonly itemsPerPage = 3;
  private currentSearch = '';
  loading = signal<boolean>(false);
  errorSignal = signal<string | null>(null);
  accumulatedFilms = signal<Film[]>([]);
  fullFilms = signal<Film[]>([]);

  execute(search: string = ''): void {
    this.currentPage = 1;
    this.currentSearch = search;
    this.fullFilms.set([]);
    this.accumulatedFilms.set([]);
    this.loadFilms();
  }

  loadMore(): void {
    this.currentPage++;
    this.loadFilms();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateFilms();
    }
  }

  get currentPageValue(): number {
    return this.currentPage;
  }

  private loadFilms(): void {
    this.loading.set(true);
    this.errorSignal.set(null);

    this.starWarsPort.getFilms(this.currentPage, this.currentSearch)
      .pipe(
        tap(() => this.loading.set(false)),
        catchError((error: Error) => {
          this.errorSignal.set(error.message || 'Error fetching films');
          this.loading.set(false);
          return of([] as Film[]);
        })
      )
      .subscribe((films: Film[]) => {
        if (this.currentPage === 1) {
          this.fullFilms.set(films);
          this.accumulatedFilms.set(films.slice(0, this.itemsPerPage));
        } else {
          const newCount = this.currentPage * this.itemsPerPage;
          this.accumulatedFilms.set(this.fullFilms().slice(0, newCount));
        }
      });
  }

  private paginateFilms(): void {
    const newCount = this.currentPage * this.itemsPerPage;
    this.accumulatedFilms.set(this.fullFilms().slice(0, newCount));
  }
}
