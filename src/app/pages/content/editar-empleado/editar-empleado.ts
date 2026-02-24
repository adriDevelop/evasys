import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empleado } from '../../../core/models/Empleado';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { Centro } from '../../../core/models/Centro';
import { FormsModule } from '@angular/forms';
import { ComunicationService } from '../../../core/services/comunication-service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ResolverComponent } from '../../../shared/components/resolver-component/resolver-component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-empleado',
  imports: [FormsModule, MatButtonModule, MatTooltipModule, RouterLink, ResolverComponent],
  templateUrl: './editar-empleado.html',
  styleUrl: './editar-empleado.css',
})
export class EditarEmpleado implements OnInit {
  estadoLogin: boolean;
  empleado: Empleado;
  centro: Centro;

  constructor(
    private route: ActivatedRoute = inject(ActivatedRoute),
    private _empleadosService: EmpleadosService = inject(EmpleadosService),
    private _comunicationService: ComunicationService = inject(ComunicationService),
    private _snackBar: MatSnackBar = inject(MatSnackBar),
    private _router: Router = inject(Router),
  ) {}

  ngOnInit(): void {
    this._comunicationService.estadoLogin$.subscribe({
      next: (estado) => {
        this.estadoLogin = estado;
      },
    });

    if (!this.estadoLogin) {
      this._router.navigate(['/']);
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this._empleadosService.getEmpleadoById(id).subscribe((e) => {
      this.empleado = e;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  editarUsuario(empleado: Empleado) {
    this._empleadosService.updateEmpleado(empleado).subscribe({
      next: (e) => {
        this.openSnackBar('Se ha actualizado correctamente el empleado', 'Cerrar');
      },

      error: () => {
        this.openSnackBar('Datos introducidos incorrectos', 'Cerrar');
      },
    });
  }
}
