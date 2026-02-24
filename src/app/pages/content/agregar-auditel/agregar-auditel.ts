import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Departamento } from '../../../core/models/Departamento';
import { Coordinador } from '../../../core/models/Coordinador';
import { Auditorias } from '../../../core/models/Auditorias';
import { AuditoriasService } from '../../../core/services/auditorias-service';
import { AcceptedService } from '../../../core/services/accepted-service';
import { ErrorService } from '../../../core/services/error-service';
import { CoordinadorService } from '../../../core/services/coordinador-service';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { Empleado } from '../../../core/models/Empleado';
import { CentroService } from '../../../core/services/centro-service';
import { DepartamentoServices } from '../../../core/services/departamento-services';
import { Colectivo } from '../../../core/models/Colectivo';
import { AuditelEntrantesDTO } from '../../../core/Dto/AuditelEntrantesDto';
import { ComunicationService } from '../../../core/services/comunication-service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../core/services/auth-service';
import { MatRadioModule } from '@angular/material/radio';
import { FormularioDinamico } from '../../../shared/components/formulario-dinamico/formulario-dinamico';

@Component({
  selector: 'app-agregar-auditel',
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatRadioModule,
    FormularioDinamico,
  ],
  templateUrl: './agregar-auditel.html',
  styleUrl: './agregar-auditel.css',
})
export class AgregarAuditel implements OnInit {
  estadoLogin: boolean;
  id_coord: number;
  tiposAsistencia: Array<String> = ['entrantes', 'salientes'];
  tiposRacetel: Array<String> = ['inboud', 'outbound', 'impagos', 'soporte'];

  formControl: FormGroup = new FormGroup({
    expediente: new FormControl(''),
    fecha: new FormControl(''),
    puntuacion_total_auditoria: new FormControl(0),
    colectivo: new FormControl(0),
    id_empleado: new FormControl(0),
    id_coordinador_empleado: new FormControl(0),
    id_departamento: new FormControl(0),
    coordinador: new FormControl(),
    departamento: new FormControl(),
    tipoAsistencia: new FormControl(),
    tipoRacetel: new FormControl(),
  });

  colectivos: Array<Colectivo>;
  empleados: Array<Empleado>;

  constructor(
    private _auditoriasService: AuditoriasService = inject(AuditoriasService),
    private _coordinadoresService: CoordinadorService = inject(CoordinadorService),
    private _centrosService: CentroService = inject(CentroService),
    private _departamentosService: DepartamentoServices = inject(DepartamentoServices),
    private _empleadosService: EmpleadosService = inject(EmpleadosService),
    private _acceptedService: AcceptedService = inject(AcceptedService),
    private _errorService: ErrorService = inject(ErrorService),
    private _comunicationService: ComunicationService = inject(ComunicationService),
    private _authService: AuthService = inject(AuthService),
    private _router: Router = inject(Router),
  ) {}

  ngOnInit(): void {
    this._comunicationService.estadoLogin$.subscribe({
      next: (estado) => {
        this.estadoLogin = estado;
      },
    });

    this.id_coord = this._authService.getIdFromPayload();

    if (!this.estadoLogin) {
      this._router.navigate(['/']);
    }

    this._empleadosService.getEmpleadosByCoordinador(this.id_coord).subscribe((e) => {
      this.empleados = e;
    });

    this.formControl.get('id_empleado')?.valueChanges.subscribe((id) => {
      if (!id) return;

      this._empleadosService.getEmpleadoById(id).subscribe((empleado) => {
        this._coordinadoresService
          .getCoordinadorById(empleado.coordinador?.id_coordinador!)
          .subscribe((coordinador) => {
            // ACTUALIZACIÓN SEGURA
            this.formControl.patchValue({
              id_coordinador_empleado: coordinador.id_coordinador,
              id_departamento: coordinador.departamento?.id_departamento,
              coordinador: coordinador,
              departamento: coordinador.departamento,
              tipoAsistencia: null,
              tipoRacetel: null,
            });
          });
      });
    });
  }

  get id_empleado() {
    return this.formControl.get('id_empleado')?.value;
  }

  get id_coordinador_empleado() {
    return this.formControl.get('id_coordinador_empleado')?.value;
  }

  get coordinador() {
    return this.formControl.get('coordinador')?.value;
  }

  get departamento() {
    return this.formControl.get('departamento')?.value;
  }

  get tipoAsistencia() {
    return this.formControl.get('tipoAsistencia')?.value;
  }

  get tipoRacetel() {
    console.log(this.formControl.get('tipoRacetel')?.value);
    return this.formControl.get('tipoRacetel')?.value;
  }
}
