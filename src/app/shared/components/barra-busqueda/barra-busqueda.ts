import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './barra-busqueda.html',
  styleUrl: './barra-busqueda.css',
})
export class BarraBusqueda implements OnInit{
    
    @Input()
    arrayBotones: Array<string>;

    @Output()
    busqueda = new EventEmitter<string>();
    controlBusqueda = new FormControl('')
    valorBusqueda = '';

    ngOnInit(): void {
        this.controlBusqueda.valueChanges.subscribe((e) => {
            this.valorBusqueda = e ?? '';
            this.busqueda.emit(e ?? '');
        })
    }
}
