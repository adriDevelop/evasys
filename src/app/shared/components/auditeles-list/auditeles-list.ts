import { Component, Input } from '@angular/core';
import { Auditorias } from '../../../core/models/Auditorias';

@Component({
  selector: 'app-auditeles-list',
  imports: [],
  templateUrl: './auditeles-list.html',
  styleUrl: './auditeles-list.css',
})
export class AuditelesList {

    @Input()
    auditoriaObject: Auditorias;
}
