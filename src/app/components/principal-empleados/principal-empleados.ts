import { Component } from '@angular/core';
import { EmpleadosList } from "../empleados-list/empleados-list";
import { BarraBusqueda } from "../barra-busqueda/barra-busqueda";

@Component({
  selector: 'app-principal-empleados',
  imports: [EmpleadosList, BarraBusqueda],
  templateUrl: './principal-empleados.html',
  styleUrl: './principal-empleados.css',
})
export class PrincipalEmpleados {

}
