import { Component, inject, OnInit } from '@angular/core';
import { Coordinador } from '../../../core/models/Coordinador';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { CoordinadorService } from '../../../core/services/coordinador-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionPanelHeader, MatExpansionPanel } from '@angular/material/expansion';
import { Empleado } from '../../../core/models/Empleado';
import { Departamento } from '../../../core/models/Departamento';
import { Centro } from '../../../core/models/Centro';
import { CentroService } from '../../../core/services/centro-service';
import { DepartamentoServices } from '../../../core/services/departamento-services';
import { CoordinadorDTO } from '../../../core/Dto/CoordinadorDTO';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoordinadorCentroDTO } from '../../../core/Dto/CoordinadorCentroDTO';
import { ResolverComponent } from '../../../shared/components/resolver-component/resolver-component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-coordinador',
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    ResolverComponent,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './editar-coordinador.html',
  styleUrl: './editar-coordinador.css',
})
export class EditarCoordinador implements OnInit {
  idCoordinador: number;
  coordinador: Coordinador;
  dataSource: Empleado[] = [];
  departamentos: Array<Departamento>;
  centros: Array<Centro>;
  displayedColumns: Array<string> = ['nombre', 'apellidos', 'usuario'];

  formControl: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    usuario: new FormControl(''),
    rol: new FormControl(''),
    departamento: new FormControl(),
    centro: new FormControl(),
    empleados: new FormArray([]),
    auditorias: new FormArray([]),
  });

  constructor(
    private _empleadosService: EmpleadosService = inject(EmpleadosService),
    private _coordinadorService: CoordinadorService = inject(CoordinadorService),
    private _centroService: CentroService = inject(CentroService),
    private _departamentoService: DepartamentoServices = inject(DepartamentoServices),
    private _snackBar: MatSnackBar = inject(MatSnackBar),
    private _router: ActivatedRoute = inject(ActivatedRoute),
  ) {}

  ngOnInit(): void {
    this.idCoordinador = parseInt(this._router.snapshot.paramMap.get('id')!);

    this._centroService.getAllCentros().subscribe((centros) => {
      this.centros = centros;
    });

    this._departamentoService.getAllDepartamentos().subscribe((departamentos) => {
      this.departamentos = departamentos;
    });

    this._coordinadorService.getCoordinadorById(this.idCoordinador).subscribe((coordinador) => {
      this.formControl.patchValue({
        nombre: coordinador.nombre,
        apellidos: coordinador.apellidos,
        usuario: coordinador.usuario,
        rol: coordinador.rol,
        departamento: coordinador.departamento?.id_departamento,
        centro: coordinador.centro?.id_centro,
      });
    });

    this._empleadosService.getEmpleadosByCoordinador(this.idCoordinador).subscribe((empleados) => {
      this.dataSource = empleados;

      empleados.forEach((empleado) => {
        this.empleados.push(new FormControl(empleado));
      });
    });

    this.formControl.get('apellidos')?.valueChanges.subscribe({
      next: (valor) => {
        this.formControl.get('apellidos')?.setValue(valor);
      },
    });

    this.formControl.get('centro')?.valueChanges.subscribe((centro) => {
      this.formControl.get('centro')?.setValue(centro, { emitEvent: false });
    });

    this.formControl.get('departamento')?.valueChanges.subscribe((departamento) => {
      this.formControl.get('departamento')?.setValue(departamento, { emitEvent: false });
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  get empleados(): FormArray {
    return this.formControl.get('empleados') as FormArray;
  }

  editarCoordinador(formControl: FormGroup) {
    const coordinadorDto: CoordinadorCentroDTO = {
      coordinador: {
        id_coordinador: this.idCoordinador,
        nombre: formControl.get('nombre')?.value,
        apellidos: formControl.get('apellidos')?.value,
        usuario: formControl.get('usuario')?.value,
        rol: formControl.get('rol')?.value,
      },
      idDepartamento: formControl.get('departamento')?.value,
      idCentro: formControl.get('centro')?.value,
    };

    this._coordinadorService.actualizarCoordinador(coordinadorDto).subscribe({
      next: (coordinador) => {
        this.openSnackBar('Actualizado correctamente', 'Cerrar');
      },
      error: () => {
        this.openSnackBar('Datos introducidos incorrectos', 'Cerrar');
      },
    });
  }

  get datosForm(): string {
    return this.formControl.get('nombre')?.value as string;
  }
}
