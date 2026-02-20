import { Component, inject, OnInit, runInInjectionContext } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Departamento } from '../../../core/models/Departamento';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CentroService } from '../../../core/services/centro-service';
import { Beans } from '../../../shared/components/beans/beans';
import { DepartamentoServices } from '../../../core/services/departamento-services';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-editar-centro',
  imports: [FormsModule, ReactiveFormsModule, Beans, MatButtonModule, MatTooltipModule, RouterLink],
  templateUrl: './editar-centro.html',
  styleUrl: './editar-centro.css',
})
export class EditarCentro implements OnInit {
  idCentro: number | null;
  todosDepartamentos: Array<Departamento>;
  departamentosDTO: Array<Departamento> = [];

  formControl = new FormGroup({
    nombre: new FormControl(''),
    localizacion: new FormControl(''),
    id_departamento: new FormControl(0),
    departamentos: new FormArray([]),
  });

  constructor(
    private _idRuta: ActivatedRoute = inject(ActivatedRoute),
    private _centroService: CentroService = inject(CentroService),
    private _departamentoService: DepartamentoServices = inject(DepartamentoServices)
  ) {
    this.idCentro = parseInt(this._idRuta.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void {
    this._centroService.getCentroById(this.idCentro!).subscribe((centro) => {
      this.formControl.patchValue({
        nombre: centro.nombre,
        localizacion: centro.localizacion,
      });

      centro.departamentos.map((dep) => {
        this.departamentos.push(new FormControl(dep));
      });
    });

    this._departamentoService.getAllDepartamentos().subscribe((departamentos) => {
      this.todosDepartamentos = departamentos;
    });

    this.formControl.get('id_departamento')?.valueChanges.subscribe((id) => {
      if (id) {
        this._departamentoService.getDepartamentoById(id).subscribe({
          next: (departamento) => {
            const arr = this.formControl.get('departamentos') as FormArray;

            if (this.obtenerIdDepartamentoFormArray(departamento) == null) {
              arr.push(new FormControl(departamento));
            } else {
              console.log('Ese departamento ya existe');
            }
          },
        });
      }
    });
  }

  get departamentos() {
    return this.formControl.get('departamentos') as FormArray;
  }

  eliminarDepartamento(id: number) {
    const arr = this.formControl.get('departamentos') as FormArray;

    this._departamentoService.getDepartamentoById(id).subscribe((dept) => {
      const index = this.obtenerIdDepartamentoFormArray(dept);
      console.log(index);
      arr.removeAt(index!);
    });
  }

  obtenerIdDepartamentoFormArray(departamento: Departamento): number | null {
    const arr = this.formControl.get('departamentos') as FormArray;
    const index = arr.controls.findIndex((index) => {
      return index.value.nombre == departamento.nombre;
    });

    return index > -1 ? index : null;
  }

  editarCentro(idCentro: number, formControl: FormGroup) {
    const departamentos = formControl.get('departamentos')?.value as Array<Departamento>;
    const idsDepartamentos = departamentos.map((dep) => {
      return dep.id_departamento!;
    });
    const nombre = formControl.get('nombre')?.value;
    const localizacion = formControl.get('localizacion')?.value;

    console.log({ idCentro, nombre, localizacion, idsDepartamentos });

    this._centroService
      .editCentro({ idCentro, nombre, localizacion, idsDepartamentos })
      .subscribe((centro) => {
        console.log(centro);
      });
  }
}
