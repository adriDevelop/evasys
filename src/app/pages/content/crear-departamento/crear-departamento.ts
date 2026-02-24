import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { DepartamentoServices } from '../../../core/services/departamento-services';
import { ColectivoService } from '../../../core/services/colectivo-service';
import { Colectivo } from '../../../core/models/Colectivo';
import { DepartamentoDTO } from '../../../core/Dto/DepartamentoDTO';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-departamento',
  imports: [RouterLink, MatButton, MatTooltip, FormsModule, ReactiveFormsModule],
  templateUrl: './crear-departamento.html',
  styleUrl: './crear-departamento.css',
})
export class CrearDepartamento implements OnInit {
  id_departamento: number;
  todosColectivos: Array<Colectivo>;

  formControl = new FormGroup({
    nombre: new FormControl(''),
    id_colectivo: new FormControl(0),
    colectivos: new FormArray([]),
  });

  constructor(
    private _departamentoService: DepartamentoServices = inject(DepartamentoServices),
    private _snackBar: MatSnackBar = inject(MatSnackBar),
    private _colectivoService: ColectivoService = inject(ColectivoService),
  ) {}

  ngOnInit(): void {
    this._colectivoService.obtenerTodosColectivos().subscribe((colectivos) => {
      colectivos.forEach((colectivo) => {
        this.todosColectivos.push(colectivo);
      });
    });

    this.formControl.get('id_colectivo')?.valueChanges.subscribe((colectivo) => {
      this._colectivoService.obtenerColectivoById(colectivo!).subscribe((colectivo) => {
        if (!this.obtenerIndexColectivo(colectivo)) {
          this.colectivos.push(new FormControl(colectivo));
        }
      });
    });
  }

  obtenerIndexColectivo(colectivo: Colectivo): number | null {
    const index = this.colectivos.controls.findIndex((index) => {
      return index.value.nombre == colectivo.nombre;
    });

    return index < -1 ? index : null;
  }

  get colectivos(): FormArray {
    return this.formControl.get('colectivos') as FormArray;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  crearDepartamento(formControl: FormGroup) {
    const idsColectivos = formControl.get('colectivos')?.value as Array<number>;
    const departamentoDto: DepartamentoDTO = {
      departamento: {
        nombre: formControl.get('nombre')?.value,
      },
      idColectivos: idsColectivos,
    };

    this._departamentoService.crearDepartamento(departamentoDto).subscribe({
      next: (departamento) => {
        this.openSnackBar('Departamento creado correctamente', 'Cerrar');
      },
      error: () => {
        this.openSnackBar('Datos introducidos incorrectos', 'Cerrar');
      },
    });
  }
}
