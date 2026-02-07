import { Component, inject, OnInit } from '@angular/core';
import { ComunicationService } from '../../../core/services/comunication-service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { BarraBusqueda } from "../../../shared/components/barra-busqueda/barra-busqueda";
import { Departamento } from '../../../core/models/Departamento';
import { DepartamentosList } from "../../../shared/components/departamentos-list/departamentos-list";
import { DepartamentoServices } from '../../../core/services/departamento-services';
import { ResolverComponent } from '../../../shared/components/resolver-component/resolver-component';

@Component({
  selector: 'app-principal-departamentos',
  imports: [BarraBusqueda, DepartamentosList, ResolverComponent],
  templateUrl: './principal-departamentos.html',
  styleUrl: './principal-departamentos.css',
})
export class PrincipalDepartamentos implements OnInit{

    rolUsuario: string;
    departamentos: Array<Departamento>;
    estadoLogin: boolean;

    constructor(
        private _comunicationService: ComunicationService = inject(ComunicationService),
        private _authService: AuthService = inject(AuthService),
        private _router: Router = inject(Router),
        private _departamentoService: DepartamentoServices = inject(DepartamentoServices)
    ){
        this.rolUsuario = this._authService.getRolFromPayload();
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

        if (this.rolUsuario != "super-admin"){
            this._router.navigate(['/empleados/listadoEmpleados'])
        }

        this._departamentoService.getAllDepartamentos().subscribe((departamentos) => {
            this.departamentos = departamentos;
        })
    }

    onBusquedaChange(busqueda: string | null){
        if (!busqueda){
            this._departamentoService.getAllDepartamentos().subscribe((departamento) => {
                this.departamentos = departamento;
            })
        }else {
            this._departamentoService.getDepartamentoByName(busqueda).subscribe((departamentos) => {
                this.departamentos = departamentos;
            })
        }
    }

}
