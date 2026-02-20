import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatCell,
  MatCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRowDef,
} from '@angular/material/table';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoordinadorService } from '../../../core/services/coordinador-service';
import { RouterLink } from '@angular/router';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { Coordinador } from '../../../core/models/Coordinador';
import { Departamento } from '../../../core/models/Departamento';
import { Centro } from '../../../core/models/Centro';
import { Empleado } from '../../../core/models/Empleado';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CentroService } from '../../../core/services/centro-service';
import { DepartamentoServices } from '../../../core/services/departamento-services';
import { CoordinadorCentroDTO } from '../../../core/Dto/CoordinadorCentroDTO';

@Component({
  selector: 'app-crear-coordinador',
  imports: [
    ReactiveFormsModule,
    MatExpansionModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCell,
    MatCellDef,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './crear-coordinador.html',
  styleUrl: './crear-coordinador.css',
})
export class CrearCoordinador implements OnInit {
  idCoordinador: number;
  coordinador: Coordinador;
  departamentos: Array<Departamento>;
  centros: Array<Centro>;
  dataSource: Empleado[] = [];
  displayedColumns: Array<string> = ['nombre', 'apellidos', 'usuario'];

  formControl: FormGroup = new FormGroup({
    idrrhh: new FormControl(''),
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    usuario: new FormControl(''),
    password: new FormControl(''),
    rol: new FormControl(''),
    departamento: new FormControl(0),
    centro: new FormControl(0),
  });

  constructor(
    private _empleadosService: EmpleadosService = inject(EmpleadosService),
    private _coordinadorService: CoordinadorService = inject(CoordinadorService),
    private _centroService: CentroService = inject(CentroService),
    private _departamentoService: DepartamentoServices = inject(DepartamentoServices)
  ) {}

  ngOnInit(): void {
    this._centroService.getAllCentros().subscribe((centros) => {
      this.centros = centros;
    });

    this._departamentoService.getAllDepartamentos().subscribe((departamentos) => {
      this.departamentos = departamentos;
    });
  }

  get empleados(): FormArray {
    return this.formControl.get('empleados') as FormArray;
  }

  crearEmpleado(formControl: FormGroup) {
    const coordinadorCentroDto: CoordinadorCentroDTO = {
      coordinador: {
        nombre: formControl.get('nombre')?.value,
        apellidos: formControl.get('apellidos')?.value,
        usuario: formControl.get('usuario')?.value,
        password: formControl.get('password')?.value,
        id_rrhh: formControl.get('idrrhh')?.value,
      },
      idDepartamento: formControl.get('departamento')?.value,
      idCentro: formControl.get('centro')?.value,
    };

    this._coordinadorService.crearCoordinador(coordinadorCentroDto).subscribe({
      next: (coordinador) => {
        console.log(coordinador);
      },
      error: () => {
        console.log('No se ha podido crear el coordinador');
      },
    });
  }
}
