import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuditoriasService } from '../../../core/services/auditorias-service';
import { Auditorias } from '../../../core/models/Auditorias';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Empleado } from '../../../core/models/Empleado';
import { ComunicationService } from '../../../core/services/comunication-service';
@Component({
  selector: 'app-editar-auditel-empleado',
  imports: [FormsModule],
  templateUrl: './editar-auditel-empleado.html',
  styleUrl: './editar-auditel-empleado.css',
})
export class EditarAuditelEmpleado implements OnInit {
  estadoLogin: boolean;

  id_auditel: string;
  auditoria: Auditorias;
  empleados: Array<Empleado>;

  constructor(
    private _audicionesService: AuditoriasService = inject(AuditoriasService),
    private _idRoute: ActivatedRoute = inject(ActivatedRoute),
    private _comunicationService: ComunicationService = inject(ComunicationService),
    private _router: Router = inject(Router)
  ) {
    this.id_auditel = this._idRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this._comunicationService.estadoLogin$.subscribe({
      next: (estado) => {
        this.estadoLogin = estado;
      },
    });

    if (!this.estadoLogin) {
      this._router.navigate(['/']);
    }

    this._audicionesService.getAuditoria(parseInt(this.id_auditel)).subscribe((a) => {
      this.auditoria = a;
    });
  }
}
