import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Departamento } from '../../../core/models/Departamento';

@Component({
  selector: 'app-beans',
  imports: [],
  templateUrl: './beans.html',
  styleUrl: './beans.css',
})
export class Beans {

    @Input()
    departamento: Departamento;

    @Output()
    eliminarDepartamento: EventEmitter<number> = new EventEmitter();

    onClickEliminate(id: number) {
        this.eliminarDepartamento.emit(id);
    }

}
