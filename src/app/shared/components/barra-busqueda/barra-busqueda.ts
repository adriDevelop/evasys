import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  imports: [RouterLink],
  templateUrl: './barra-busqueda.html',
  styleUrl: './barra-busqueda.css',
})
export class BarraBusqueda {

    @Input()
    arrayBotones: Array<string>;



}
