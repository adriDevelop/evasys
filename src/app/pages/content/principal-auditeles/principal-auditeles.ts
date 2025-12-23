import { Component, inject, OnInit } from '@angular/core';
import { BarraBusqueda } from "../../../shared/components/barra-busqueda/barra-busqueda";
import { AuditelesList } from "../../../shared/components/auditeles-list/auditeles-list";
import { AuditoriasService } from '../../../core/services/auditorias-service';
import { Auditorias } from '../../../core/models/Auditorias';

@Component({
  selector: 'app-principal-auditeles',
  imports: [BarraBusqueda, AuditelesList],
  templateUrl: './principal-auditeles.html',
  styleUrl: './principal-auditeles.css',
})
export class PrincipalAuditeles implements OnInit{

    auditorias: Array<Auditorias>;

    constructor(
        private _auditoriasService:AuditoriasService = inject(AuditoriasService),
    ){}

    ngOnInit(): void {
        this._auditoriasService.getAuditorias().subscribe((a) => {
            this.auditorias = a;
        })
    }




}
