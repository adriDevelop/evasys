import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { EmpleadosList } from '../../../shared/components/empleados-list/empleados-list';
import { BarraBusqueda } from '../../../shared/components/barra-busqueda/barra-busqueda';
import { Empleado } from '../../../core/models/Empleado';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { Centro } from '../../../core/models/Centro';
@Component({
  selector: 'app-principal-empleados',
  imports: [EmpleadosList, BarraBusqueda],
  templateUrl: './principal-empleados.html',
  styleUrl: './principal-empleados.css',
})
export class PrincipalEmpleados implements OnInit {

  empleados: Array<Empleado>;

  constructor(private _empleadosService: EmpleadosService = inject(EmpleadosService)) {}

  ngOnInit(): void {
    this._empleadosService.getAllEmpleados().subscribe((e) => {
      this.empleados = e;
    });
  }

  eliminarEmpleado(id: number){
    this._empleadosService.deleteEmpleadoById(id).subscribe( (e) => {
        this.empleados = this.empleados.filter(e => e.id_empleado !== id );
        console.log('Empleado eliminado correctamente');
    })
  }
}
