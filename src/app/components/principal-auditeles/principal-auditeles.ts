import { Component } from '@angular/core';
import { BarraBusqueda } from "../barra-busqueda/barra-busqueda";
import { AuditelesList } from "../auditeles-list/auditeles-list";

@Component({
  selector: 'app-principal-auditeles',
  imports: [BarraBusqueda, AuditelesList],
  templateUrl: './principal-auditeles.html',
  styleUrl: './principal-auditeles.css',
})
export class PrincipalAuditeles {

}
