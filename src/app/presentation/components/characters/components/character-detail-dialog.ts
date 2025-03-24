import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Character } from '../../../../domain/models/character.model';

@Component({
  selector: 'app-character-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './character-detail-dialog.component.html',
  styleUrls: ['./character-detail-dialog.component.scss']
})
export class CharacterDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public character: Character,
    private readonly dialogRef: MatDialogRef<CharacterDetailDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
