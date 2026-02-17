import { Component, inject, OnInit } from '@angular/core';
import { Coordinador } from '../../../core/models/Coordinador';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { CoordinadorService } from '../../../core/services/coordinador-service';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from "@angular/material/table";
import { MatExpansionPanelHeader, MatExpansionPanel } from "@angular/material/expansion";
import { Empleado } from '../../../core/models/Empleado';
import { Departamento } from '../../../core/models/Departamento';
import { Centro } from '../../../core/models/Centro';
import { CentroService } from '../../../core/services/centro-service';
import { DepartamentoServices } from '../../../core/services/departamento-services';
import { CoordinadorDTO } from '../../../core/Dto/CoordinadorDTO';

@Component({
  selector: 'app-editar-coordinador',
  imports: [ReactiveFormsModule, MatTableModule, MatExpansionPanelHeader, MatExpansionPanel],
  templateUrl: './editar-coordinador.html',
  styleUrl: './editar-coordinador.css',
})
export class EditarCoordinador implements OnInit{

    idCoordinador: number;
    coordinador: Coordinador;
    dataSource: Empleado[] = [];
    departamentos: Array<Departamento>;
    centros: Array<Centro>;
    displayedColumns: Array<string> = ["nombre", "apellidos", "usuario"];

    formControl: FormGroup = new FormGroup({
        nombre: new FormControl(''),
        apellidos: new FormControl(''),
        usuario: new FormControl(''),
        rol: new FormControl(''),
        departamento: new FormControl(),
        centro: new FormControl(),
        empleados: new FormArray([]),
        auditorias: new FormArray([])
    })


    constructor(
        private _empleadosService: EmpleadosService = inject(EmpleadosService),
        private _coordinadorService: CoordinadorService = inject(CoordinadorService),
        private _centroService: CentroService = inject(CentroService),
        private _departamentoService: DepartamentoServices = inject(DepartamentoServices),
        private _router: ActivatedRoute = inject(ActivatedRoute)
    ){
    }

    ngOnInit(): void {

        this.idCoordinador = parseInt(this._router.snapshot.paramMap.get('id')!);

        this._centroService.getAllCentros().subscribe((centros) => {
            this.centros = centros;
        })

        this._departamentoService.getAllDepartamentos().subscribe((departamentos) => {
            this.departamentos = departamentos;
        })

        this._coordinadorService.getCoordinadorById(this.idCoordinador).subscribe((coordinador) => {
           this.formControl.patchValue({
            nombre: coordinador.nombre,
            apellidos: coordinador.apellidos,
            usuario: coordinador.usuario,
            rol: coordinador.rol,
            departamento: coordinador.departamento.id_departamento,
            centro:coordinador.centro.id_centro,
            })
        });

        this._empleadosService.getEmpleadosByCoordinador(this.idCoordinador).subscribe((empleados) => {

            this.dataSource = empleados;

            empleados.forEach(empleado => {
                this.empleados.push(new FormControl(empleado));
            })
        });

        this.formControl.get('centro')?.valueChanges.subscribe((centro) => {
            this.formControl.get('centro')?.setValue(centro, {emitEvent: false});
            console.log(this.formControl.get('centro'));
        })

        this.formControl.get('departamento')?.valueChanges.subscribe((departamento) => {
            this.formControl.get('departamento')?.setValue(departamento, {emitEvent: false});
        })
    }

    get empleados(): FormArray {
        return this.formControl.get('empleados') as FormArray;
    }

    editarCoordinador(coordinadorDto: CoordinadorDTO){

    }

}
