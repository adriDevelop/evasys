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

@Component({
  selector: 'app-editar-departamento',
  imports: [RouterLink, MatButton, MatTooltip, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-departamento.html',
  styleUrl: './editar-departamento.css',
})
export class EditarDepartamento implements OnInit {
  id_departamento: number;
  todosColectivos: Array<Colectivo>;

  formControl = new FormGroup({
    nombre: new FormControl(''),
    id_colectivo: new FormControl(0),
    colectivos: new FormArray([]),
  });

  constructor(
    private _router: ActivatedRoute = inject(ActivatedRoute),
    private _departamentoService: DepartamentoServices = inject(DepartamentoServices),
    private _colectivoService: ColectivoService = inject(ColectivoService)
  ) {
    this.id_departamento = parseInt(this._router.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void {
    this._departamentoService
      .getDepartamentoById(this.id_departamento)
      .subscribe((departamento) => {
        this.formControl.patchValue({
          nombre: departamento.nombre,
        });

        departamento.colectivos.forEach((colectivo) => {
          this.colectivos.push(new FormControl(colectivo));
        });
      });

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
}
