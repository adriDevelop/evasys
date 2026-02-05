import { Component, inject, OnInit } from '@angular/core';
import { ComunicationService } from '../../../core/services/comunication-service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { CoordinadoresList } from "../../../shared/components/coordinadores-list/coordinadores-list";
import { Coordinador } from '../../../core/models/Coordinador';
import { BarraBusqueda } from '../../../shared/components/barra-busqueda/barra-busqueda';
import { CoordinadorService } from '../../../core/services/coordinador-service';

@Component({
  selector: 'app-principal-coordinador',
  imports: [BarraBusqueda, CoordinadoresList],
  templateUrl: './principal-coordinador.html',
  styleUrl: './principal-coordinador.css',
})
export class PrincipalCoordinador implements OnInit{

    coordinadores: Array<Coordinador>;
    estadoLogin: boolean;

    constructor(
        private _comunicationService: ComunicationService = inject(ComunicationService),
        private _authService: AuthService = inject(AuthService),
        private _router: Router = inject(Router),
        private _coordinadorService: CoordinadorService = inject(CoordinadorService),
    ){

    }


    ngOnInit(): void {

        this._comunicationService.estadoLogin$.subscribe({
            next: (estado) => {
                this.estadoLogin = estado;
            }
        })

        if(!this.estadoLogin){
            this._router.navigate(['/']);
        }

        if(this._authService.getRolFromPayload() != 'super-admin'){
            this._router.navigate(['/empleados/listadoEmpleados']);
        }

        this._coordinadorService.getAllCoordinadores().subscribe({
            next: (coordinadores) => {
                this.coordinadores = coordinadores;
            }
        })
    }

}
