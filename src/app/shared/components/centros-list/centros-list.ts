import { Component, Input } from '@angular/core';
import { Centro } from '../../../core/models/Centro';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-centros-list',
  imports: [RouterLink],
  templateUrl: './centros-list.html',
  styleUrl: './centros-list.css',
})
export class CentrosList {

    @Input()
    centro: Centro;

}
