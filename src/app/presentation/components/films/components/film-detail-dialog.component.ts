import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Film } from '../../../../domain/models/film.model';

@Component({
  selector: 'app-film-detail-dialog',
  standalone: true,
  templateUrl: './film-detail-dialog.component.html',
  styleUrls: ['./film-detail-dialog.component.scss'],
  imports: [MatDialogModule, MatDialogModule]
})
export class FilmDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public film: Film,
    private readonly dialogRef: MatDialogRef<FilmDetailDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
