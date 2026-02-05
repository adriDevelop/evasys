import { Component, Input } from '@angular/core';
import { Coordinador } from '../../../core/models/Coordinador';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coordinadores-list',
  imports: [RouterLink],
  templateUrl: './coordinadores-list.html',
  styleUrl: './coordinadores-list.css',
})
export class CoordinadoresList {

    @Input()
    coordinador: Coordinador;

}
