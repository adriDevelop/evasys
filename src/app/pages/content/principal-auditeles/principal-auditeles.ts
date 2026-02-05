import { Component, inject, OnInit } from '@angular/core';
import { BarraBusqueda } from "../../../shared/components/barra-busqueda/barra-busqueda";
import { AuditelesList } from "../../../shared/components/auditeles-list/auditeles-list";
import { AuditoriasService } from '../../../core/services/auditorias-service';
import { Auditorias } from '../../../core/models/Auditorias';
import { ComunicationService } from '../../../core/services/comunication-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-auditeles',
  imports: [BarraBusqueda, AuditelesList],
  templateUrl: './principal-auditeles.html',
  styleUrl: './principal-auditeles.css',
})
export class PrincipalAuditeles implements OnInit{

    estadoLogin: boolean;
    auditorias: Array<Auditorias>;

    constructor(
        private _auditoriasService:AuditoriasService = inject(AuditoriasService),
        private _comunicationService: ComunicationService = inject(ComunicationService),
        private _router: Router = inject(Router)
    ){}

    ngOnInit(): void {

        this._comunicationService.estadoLogin$.subscribe({
            next: (estado) => {
                this.estadoLogin = estado;
            }
        })

        if (!this.estadoLogin){
            this._router.navigate(['/']);
        }

        this._auditoriasService.getAuditorias().subscribe((a) => {
            this.auditorias = a;
        })
    }
}
