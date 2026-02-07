import { Component, inject, OnInit } from '@angular/core';
import { ComunicationService } from '../../../core/services/comunication-service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { BarraBusqueda } from '../../../shared/components/barra-busqueda/barra-busqueda';
import { Centro } from '../../../core/models/Centro';
import { CentrosList } from '../../../shared/components/centros-list/centros-list';
import { CentroService } from '../../../core/services/centro-service';
import { ResolverComponent } from '../../../shared/components/resolver-component/resolver-component';

@Component({
  selector: 'app-principal-centros',
  imports: [BarraBusqueda, CentrosList, ResolverComponent],
  templateUrl: './principal-centros.html',
  styleUrl: './principal-centros.css',
})
export class PrincipalCentros implements OnInit {
  estadoLogin: boolean;
  centros: Array<Centro>;

  constructor(
    private _comunicationService: ComunicationService = inject(ComunicationService),
    private _centroService: CentroService = inject(CentroService),
    private _authService: AuthService = inject(AuthService),
    private _router: Router = inject(Router)
  ) {}

  ngOnInit(): void {
    this._comunicationService.estadoLogin$.subscribe({
      next: (estado) => {
        this.estadoLogin = estado;
      },
    });

    this._centroService.getAllCentros().subscribe({
      next: (centros) => {
        this.centros = centros;
      },
    });

    if (!this.estadoLogin) {
      this._router.navigate(['/']);
    }

    if (this._authService.getRolFromPayload() != 'super-admin') {
      this._router.navigate(['/empleados/listadoEmpleados']);
    }
  }

  onBusquedaChange(busquedaRealizada: string | null) {
    if (!busquedaRealizada) {
      this._centroService.getAllCentros().subscribe((centros) => {
        this.centros = centros;
      });
    } else {
      this._centroService.getCentroByNombre(busquedaRealizada).subscribe((centros) => {
        this.centros = centros;
      });
    }
  }
}
