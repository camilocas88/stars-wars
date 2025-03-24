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
import { GetCharactersUsecase } from '../../../application/get-characters.usecase';
import { Character } from '../../../domain/models/character.model';
import { CharacterDetailDialogComponent } from './components/character-detail-dialog';

@Component({
  selector: 'app-characters',
  standalone: true,
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class CharactersComponent implements OnInit {
  @HostBinding('class') class = 'app-characters';

  searchTerm = signal('');

  getCharactersUsecase = inject(GetCharactersUsecase);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  characters = this.getCharactersUsecase.charactersSignal;
  loading = this.getCharactersUsecase.loading;
  error = this.getCharactersUsecase.errorSignal;

  filteredCharacters = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return this.characters().filter((char) => {
      return (
        !search ||
        char.name.toLowerCase().includes(search) ||
        char.gender.toLowerCase().includes(search)
      );
    });
  });

  loadingDetailUid = signal<string | null>(null);

  ngOnInit(): void {
    this.getCharactersUsecase.execute(1, '');
  }

  clearFilters(): void {
    this.searchTerm.set('');
  }

  openCharacterDetail(uid: string): void {
    this.loadingDetailUid.set(uid);
    this.getCharactersUsecase.fetchCharacterDetail(uid).subscribe({
      next: (charDetail: Character) => {
        this.loadingDetailUid.set(null);
        this.dialog.open(CharacterDetailDialogComponent, {
          data: charDetail,
          width: '400px',
        });
      },
      error: (err) => {
        console.error('Error fetching character detail:', err);
        this.loadingDetailUid.set(null);
      },
    });
  }

  loadMore(): void {
    this.getCharactersUsecase.loadMore();
  }
}
