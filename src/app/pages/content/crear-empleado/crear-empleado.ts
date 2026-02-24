import { Component, inject, OnInit } from '@angular/core';
import { Empleado } from '../../../core/models/Empleado';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { Departamento } from '../../../core/models/Departamento';
import { DepartamentoServices } from '../../../core/services/departamento-services';
import { Centro } from '../../../core/models/Centro';
import { CentroService } from '../../../core/services/centro-service';
import { CoordinadorService } from '../../../core/services/coordinador-service';
import { Coordinador } from '../../../core/models/Coordinador';
import { ErrorService } from '../../../core/services/error-service';
import { AcceptedService } from '../../../core/services/accepted-service';
import { ComunicationService } from '../../../core/services/comunication-service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-crear-empleado',
  imports: [FormsModule, MatButtonModule, MatTooltipModule, RouterLink],
  templateUrl: './crear-empleado.html',
  styleUrl: './crear-empleado.css',
})
export class CrearEmpleado implements OnInit {
  estadoLogin: boolean;

  empleado: Empleado;
  departamentos: Array<Departamento>;
  centros: Array<Centro>;
  coordinadores: Array<Coordinador>;
  nombre: string;
  apellidos: string;
  email: string;
  direccion: string;
  actividad: string;
  id_departamento: number;
  id_centro: number;
  id_coordinador: number;

  constructor(
    private _empleadosService: EmpleadosService = inject(EmpleadosService),
    private _departamentosService: DepartamentoServices = inject(DepartamentoServices),
    private _centrosService: CentroService = inject(CentroService),
    private _snackBar: MatSnackBar = inject(MatSnackBar),
    private _coordinadorService: CoordinadorService = inject(CoordinadorService),
    private _errorService: ErrorService = inject(ErrorService),
    private _acceptedService: AcceptedService = inject(AcceptedService),
    private _comunicationService: ComunicationService = inject(ComunicationService),
    private _route: Router = inject(Router),
  ) {}

  ngOnInit(): void {
    this._comunicationService.estadoLogin$.subscribe({
      next: (estado) => {
        this.estadoLogin = estado;
      },
    });

    if (!this.estadoLogin) {
      this._route.navigate(['/']);
    }

    this._departamentosService.getAllDepartamentos().subscribe((d) => {
      this.departamentos = d;
    });

    this._centrosService.getAllCentros().subscribe((c) => {
      this.centros = c;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  crearEmpleado(empleado: Empleado) {
    this._empleadosService
      .createEmpleado(this.id_coordinador, this.id_departamento, empleado)
      .subscribe({
        next: () => {
          this.openSnackBar('Empleado creado correctente', 'Cerrar');
        },
        error: () => {
          this.openSnackBar('No se ha podido crear el empleado', 'Cerrar');
        },
      });
  }

  onIdCentroChange() {
    if (this.id_centro && this.id_departamento) {
      this.obtenerCoordinadores(this.id_departamento, this.id_centro);
    }
  }

  onIdDepartamentoChange() {
    if (this.id_centro && this.id_departamento) {
      this.obtenerCoordinadores(this.id_departamento, this.id_centro);
    }
  }

  obtenerCoordinadores(idDepartamento: number, idCentro: number) {
    this._coordinadorService
      .getCoordinadoresDepartamentoCentral(idDepartamento, idCentro)
      .subscribe((c) => {
        this.coordinadores = c;
      });
  }
}
