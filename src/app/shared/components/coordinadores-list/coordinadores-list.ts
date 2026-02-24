import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Coordinador } from '../../../core/models/Coordinador';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { DialogCambiarPassCood } from '../dialog-cambiar-pass-cood/dialog-cambiar-pass-cood';
import { CoordinadorService } from '../../../core/services/coordinador-service';

@Component({
  selector: 'app-coordinadores-list',
  imports: [RouterLink],
  templateUrl: './coordinadores-list.html',
  styleUrl: './coordinadores-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoordinadoresList {
  @Input()
  coordinador: Coordinador;

  constructor(
    private dialog: MatDialog = inject(MatDialog),
    private _coordinadorService: CoordinadorService = inject(CoordinadorService),
  ) {}

  cambiarPass(id_coordinador: number) {
    const dialogRef = this.dialog.open(DialogCambiarPassCood, { data: { password: '' } });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== null && result !== '') {
        this._coordinadorService.cambiarContraseñaCoordinador(id_coordinador, result).subscribe({
          next: () => {},
          error: () => {},
        });
      }
    });
  }
}
