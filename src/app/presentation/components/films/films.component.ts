import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { GetFilmsUsecase } from '../../../application/get-film.usecase';
import { Film } from '../../../domain/models/film.model';
import { FilmDetailDialogComponent } from './components/film-detail-dialog.component';

@Component({
  selector: 'app-films',
  standalone: true,
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
  ],
})
export class FilmsComponent implements OnInit {
  @HostBinding('class') class = 'app-films';

  searchTerm = signal('');
  selectedEpisode = signal<number[]>([]);
  selectedDirector = signal<string[]>([]);

  availableEpisodes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  availableDirectors = computed(() =>
    Array.from(new Set(this.getFilmsUsecase.fullFilms().map((f) => f.director)))
  );

  readonly getFilmsUsecase = inject(GetFilmsUsecase);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  films = this.getFilmsUsecase.accumulatedFilms;
  loading = this.getFilmsUsecase.loading;
  error = this.getFilmsUsecase.errorSignal;

  filteredFilms = computed(() => {
    return this.films().filter((film) => {
      const search = this.searchTerm().toLowerCase();
      const matchesSearch =
        !search ||
        film.title.toLowerCase().includes(search) ||
        film.director.toLowerCase().includes(search);
      const matchesEpisode =
        this.selectedEpisode().length === 0 ||
        this.selectedEpisode().includes(film.episode_id);
      const matchesDirector =
        this.selectedDirector().length === 0 ||
        this.selectedDirector().some((d) =>
          film.director.toLowerCase().includes(d.toLowerCase())
        );
      return matchesSearch && matchesEpisode && matchesDirector;
    });
  });

  ngOnInit(): void {
    this.getFilmsUsecase.execute('');
  }

  applyFilters(): void {}

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedEpisode.set([]);
    this.selectedDirector.set([]);
    this.applyFilters();
  }

  openFilmDialog(film: Film): void {
    this.dialog.open(FilmDetailDialogComponent, {
      data: film,
      width: '500px',
    });
  }

  loadMore(): void {
    this.getFilmsUsecase.loadMore();
  }

  prevPage(): void {
    this.getFilmsUsecase.prevPage();
  }

  hasMoreFilms(): boolean {
    return this.getFilmsUsecase.fullFilms().length > this.films().length;
  }

  navigateToFilmDetail(filmId: string): void {
    this.router.navigate(['/films', filmId]);
  }
}
