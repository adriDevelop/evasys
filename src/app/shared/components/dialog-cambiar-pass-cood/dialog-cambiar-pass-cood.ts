import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-cambiar-pass-cood',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog-cambiar-pass-cood.html',
  styleUrl: './dialog-cambiar-pass-cood.css',
})
export class DialogCambiarPassCood {
  readonly dialogoRef = inject(MatDialogRef<DialogCambiarPassCood>);
  readonly data = inject(MAT_DIALOG_DATA);
  passwd = model(this.data.password);

  onNoClick(): void {
    this.dialogoRef.close();
  }
}
