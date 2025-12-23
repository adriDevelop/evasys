import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Empleado } from '../../../core/models/Empleado';

@Component({
  selector: 'app-empleados-list',
  imports: [RouterLink],
  templateUrl: './empleados-list.html',
  styleUrl: './empleados-list.css',
})
export class EmpleadosList implements OnInit{

    id: string

    @Input()
    empleado: Empleado;
    @Output() borrarEmpleado = new EventEmitter<number>();

    constructor(
        private _activatedRoute: ActivatedRoute
    ){
    }

    ngOnInit(): void {
        this.id = this._activatedRoute.snapshot.paramMap.get('id')!;
    }

    eliminarEmpleado(id: number){
        this.borrarEmpleado.emit(id);
    }

}
