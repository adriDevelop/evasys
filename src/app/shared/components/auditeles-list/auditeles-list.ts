import { Component, Input } from '@angular/core';
import { Auditorias } from '../../../core/models/Auditorias';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-auditeles-list',
  imports: [RouterLink],
  templateUrl: './auditeles-list.html',
  styleUrl: './auditeles-list.css',
})
export class AuditelesList {

    @Input()
    auditoriaObject: Auditorias;
}
