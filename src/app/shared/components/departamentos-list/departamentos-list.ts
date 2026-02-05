import { Component, Input } from '@angular/core';
import { Departamento } from '../../../core/models/Departamento';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-departamentos-list',
  imports: [RouterLink],
  templateUrl: './departamentos-list.html',
  styleUrl: './departamentos-list.css',
})
export class DepartamentosList {

    @Input()
    departamento: Departamento;

}
