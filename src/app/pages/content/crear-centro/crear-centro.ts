import { Component, inject, OnInit } from '@angular/core';
import { Departamento } from '../../../core/models/Departamento';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CentroService } from '../../../core/services/centro-service';
import { DepartamentoServices } from '../../../core/services/departamento-services';
import { Beans } from '../../../shared/components/beans/beans';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-centro',
  imports: [FormsModule, ReactiveFormsModule, Beans, RouterLink, MatButtonModule, MatTooltipModule],
  templateUrl: './crear-centro.html',
  styleUrl: './crear-centro.css',
})
export class CrearCentro implements OnInit {
  formControl: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    localizacion: new FormControl(''),
    id_departamento: new FormControl(0),
    departamentos: new FormArray([]),
  });

  departamentos: Array<Departamento>;

  constructor(
    private _centroService: CentroService = inject(CentroService),
    private _snackBar: MatSnackBar = inject(MatSnackBar),
    private _departamentoService: DepartamentoServices = inject(DepartamentoServices),
  ) {}

  ngOnInit(): void {
    this._departamentoService.getAllDepartamentos().subscribe((depts) => {
      this.departamentos = depts;
    });

    this.formControl.get('id_departamento')?.valueChanges.subscribe((id) => {
      console.log(id);
      this._departamentoService.getDepartamentoById(id).subscribe((departamento) => {
        if (this.getIndexFromArray(departamento) == null) {
          this.agregarDepartamento(departamento);
          console.log('Agregado');
          console.log(this.formControl.get('id_departamento')?.value);
        } else {
          console.log('Ese departamento ya está agregado.');
        }
      });
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  agregarCentro(formGroup: FormGroup) {
    const nombre = formGroup.get('nombre')?.value;
    const localizacion = formGroup.get('localizacion')?.value;
    const departamentos = formGroup.get('departamentos')?.value as Array<Departamento>;
    const idsDepartamentos = departamentos.map((dep) => {
      console.log(dep);
      return dep.id_departamento!;
    });

    console.log(idsDepartamentos);

    this._centroService.createCentro({ nombre, localizacion, idsDepartamentos }).subscribe({
      next: () => {
        this.openSnackBar('Centro creado correctamente', 'Cerrar');
      },
      error: () => {
        this.openSnackBar('Datos introducidos incorrectos', 'Cerrar');
      },
    });
  }

  get departamentosAgregados() {
    return this.formControl.get('departamentos') as FormArray;
  }

  getIndexFromArray(departamento: Departamento): number | null {
    const arr = this.formControl.get('departamentos') as FormArray;

    const index = arr.controls.findIndex((dep) => {
      return dep.value.nombre == departamento.nombre;
    });

    return index > -1 ? index : null;
  }

  agregarDepartamento(departamento: Departamento) {
    const arr = this.formControl.get('departamentos') as FormArray;
    arr.push(new FormControl(departamento));
    console.log(this.formControl.get('departamentos')?.value);
  }

  eliminarDepartamento(id: number) {
    const arr = this.formControl.get('departamentos') as FormArray;

    this._departamentoService.getDepartamentoById(id).subscribe((departamento) => {
      const index = this.getIndexFromArray(departamento);
      arr.removeAt(index!);
    });
  }
}
