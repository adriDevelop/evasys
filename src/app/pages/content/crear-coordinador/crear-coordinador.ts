import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef } from '@angular/material/table';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoordinadorService } from '../../../core/services/coordinador-service';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { Coordinador } from '../../../core/models/Coordinador';

@Component({
  selector: 'app-crear-coordinador',
  imports: [ReactiveFormsModule, MatExpansionModule, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef],
  templateUrl: './crear-coordinador.html',
  styleUrl: './crear-coordinador.css',
})
export class CrearCoordinador implements OnInit{

    idCoordinador: number;
    coordinador: Coordinador;

    formControl: FormGroup = new FormGroup({
        nombre: new FormControl(''),
        apellidos: new FormControl(''),
        usuario: new FormControl(''),
        rol: new FormControl(''),
        departamento: new FormControl(''),
        centro: new FormControl(''),
        empleados: new FormArray([]),
        auditorias: new FormArray([])
    })

    constructor(
        private _empleadosService: EmpleadosService = inject(EmpleadosService),
        private _coordinadorService: CoordinadorService = inject(CoordinadorService),
        private _router: ActivatedRoute = inject(ActivatedRoute)
    ){
        this.idCoordinador = parseInt(this._router.snapshot.paramMap.get('id')!);
    }

    ngOnInit(): void {

        this._coordinadorService.getCoordinadorById(this.idCoordinador).subscribe((coordinador) => {
            this.coordinador = coordinador;
        });

        this.formControl.patchValue({
            nombre: this.coordinador.nombre,
            apellidos: this.coordinador.apellidos,
            usuario: this.coordinador.usuario,
            rol: this.coordinador.rol,
            departamento: this.coordinador.departamento,
            centro: this.coordinador.centro,
        })

        this._empleadosService.getEmpleadosByCoordinador(this.idCoordinador).subscribe((empleados) => {
            empleados.forEach(empleado => {
                this.empleados.controls.push(new FormControl(empleado));
            })
        });
    }

    get empleados(): FormArray {
        return this.formControl.get('empleados') as FormArray;
    }

    getCoordinador(id: number){
        
    }
}
