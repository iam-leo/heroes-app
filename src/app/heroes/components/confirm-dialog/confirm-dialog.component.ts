import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: ``
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
