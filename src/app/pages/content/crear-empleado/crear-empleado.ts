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

@Component({
  selector: 'app-crear-empleado',
  imports: [FormsModule],
  templateUrl: './crear-empleado.html',
  styleUrl: './crear-empleado.css',
})
export class CrearEmpleado implements OnInit{

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
        private _coordinadorService: CoordinadorService = inject(CoordinadorService),
        private _errorService: ErrorService = inject(ErrorService),
        private _acceptedService: AcceptedService = inject(AcceptedService)
    ){}

    ngOnInit(): void {

        this._departamentosService.getAllDepartamentos().subscribe((d) => {
            this.departamentos = d;
        })

        this._centrosService.getAllCentros().subscribe((c) => {
            this.centros = c;
        })
    }

    crearEmpleado(empleado: Empleado){
        this._empleadosService.createEmpleado(this.id_coordinador, this.id_departamento, empleado).subscribe({
            next: () => {
                this._acceptedService.showMessage("Empleado creado correctamente");
            },
            error: () => {
                this._errorService.showMessageError("Faltan datos");
            }
        })
    }

    onIdCentroChange(){
        if (this.id_centro && this.id_departamento){
            this.obtenerCoordinadores(this.id_departamento, this.id_centro);
        }
    }

    onIdDepartamentoChange(){
        if (this.id_centro && this.id_departamento){
            this.obtenerCoordinadores(this.id_departamento, this.id_centro);
        }
    }

    obtenerCoordinadores(idDepartamento: number, idCentro: number){
        this._coordinadorService.getCoordinadoresDepartamentoCentral(idDepartamento, idCentro).subscribe((c) => {
            this.coordinadores = c;
        })
    }

}
