import { Component } from '@angular/core';
import { BarraBusqueda } from "../../../shared/components/barra-busqueda/barra-busqueda";
import { AuditelesList } from "../../../shared/components/auditeles-list/auditeles-list";

@Component({
  selector: 'app-principal-auditeles',
  imports: [BarraBusqueda, AuditelesList],
  templateUrl: './principal-auditeles.html',
  styleUrl: './principal-auditeles.css',
})
export class PrincipalAuditeles {

}
