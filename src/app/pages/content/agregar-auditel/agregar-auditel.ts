import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { AuditelDTO } from '../../../core/Dto/AuditelDto';

@Component({
  selector: 'app-agregar-auditel',
  imports: [FormsModule],
  templateUrl: './agregar-auditel.html',
  styleUrl: './agregar-auditel.css',
})
export class AgregarAuditel implements OnInit{

    // Datos necesarios para mostrar el formulario
    coordinadores: Array<Coordinador>;
    colectivos: Array<Colectivo>;
    empleados: Array<Empleado>;
    coordinador: string;
    coordinadorAuditoria: Coordinador;
    departamento: Departamento;

    // Datos necesarios para dto
    id_empleado: number;
    id_coordinador_empleado: number;
    id_coordinador_auditel: number;
    id_departamento: number;

    // Datos necesarios para Audicion
    expediente: string;
    fecha: string;
    puntuacion_total_auditoria: number;
    colectivo: number;
    
    constructor(
        private _auditoriasService: AuditoriasService = inject(AuditoriasService),
        private _coordinadoresService: CoordinadorService = inject(CoordinadorService),
        private _centrosService: CentroService = inject(CentroService),
        private _departamentosService: DepartamentoServices = inject(DepartamentoServices),
        private _empleadosService: EmpleadosService = inject(EmpleadosService),
        private _acceptedService: AcceptedService = inject(AcceptedService),
        private _errorService: ErrorService = inject(ErrorService),
    ){

    }

    ngOnInit(): void {
        this._empleadosService.getAllEmpleados().subscribe((e) => {
            this.empleados = e;
        });
    }

    crearAuditel(auditelDto: AuditelDTO){
        this._auditoriasService.createAuditoria(auditelDto).subscribe({
            next: () => {
                this._acceptedService.showMessage("Auditoria creada correctamente");
            },
            error: () => {
                this._errorService.showMessageError("No se ha podido crear");
            }
        });
    }

    onEmpleadoChanges(){
        this._empleadosService.getEmpleadoById(this.id_empleado).subscribe((e) => {
            this.id_departamento = e.departamento?.id_departamento!;
            this.departamento = e.departamento!;
            this.id_coordinador_empleado = e.coordinador?.id_coordinador!;
            this.coordinador = e.coordinador?.nombre!;
            this._departamentosService.getDepartamentoById(this.id_departamento).subscribe((d) => {
                this.colectivos = d.colectivos;
            })
            this._coordinadoresService.getCoordinadoresDepartamentoCentral(this.id_departamento, e.centro?.id_centro!).subscribe((c) => {
                this.coordinadores = c;
            })

            console.log(this.id_departamento);
        });
    }

    onColectivoChanges(){
        
    }

    onCoordinadorAuditoriaChanges(){
       
    };

}
