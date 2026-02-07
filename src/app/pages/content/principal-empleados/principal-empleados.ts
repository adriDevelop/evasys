import { Component, inject, OnInit } from '@angular/core';
import { EmpleadosList } from '../../../shared/components/empleados-list/empleados-list';
import { BarraBusqueda } from '../../../shared/components/barra-busqueda/barra-busqueda';
import { Empleado } from '../../../core/models/Empleado';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { AuthService } from '../../../core/services/auth-service';
import { ComunicationService } from '../../../core/services/comunication-service';
import { Router } from '@angular/router';
import { ResolverComponent } from '../../../shared/components/resolver-component/resolver-component';
@Component({
  selector: 'app-principal-empleados',
  imports: [EmpleadosList, BarraBusqueda, ResolverComponent],
  templateUrl: './principal-empleados.html',
  styleUrl: './principal-empleados.css',
})
export class PrincipalEmpleados implements OnInit {

    rolUsuario: string;
    estadoLogin: boolean;
    empleados: Array<Empleado>;
    carga: boolean;

  constructor(
    private _empleadosService: EmpleadosService = inject(EmpleadosService),
    private _authService: AuthService = inject(AuthService),
    private _comunicationService: ComunicationService = inject(ComunicationService),
    private _router: Router = inject(Router),
    ) {
        this.rolUsuario = this._authService.getRolFromPayload();
    }

  ngOnInit(): void {

        this._comunicationService.estadoLogin$.subscribe({
            next: (estado) => {
                this.estadoLogin = estado;
            }
        })

        if (this._authService.getRolFromPayload() == 'super-admin'){
            this.obtenerEmpleados()
        }else {
            this.obtenerEmpleadosCoordinador();
        }
        
        if(!this.estadoLogin){
            this._router.navigate(['/']);
        }

    }

    onBusquedaChanges(busquedaRecibida: string | null){
        if (!busquedaRecibida){
            this.comprobarRolUsuario(this.rolUsuario);
        }else {
            this.comprobarRolUsuarioBusqueda(this.rolUsuario, busquedaRecibida);
            console.log(busquedaRecibida);
        }
    }

  eliminarEmpleado(id: number){
    this._empleadosService.deleteEmpleadoById(id).subscribe( (e) => {
        this.empleados = this.empleados.filter(e => e.id_empleado !== id );
        console.log('Empleado eliminado correctamente');
    })
  }

  comprobarRolUsuario(rolUsuario: string){
    if (rolUsuario == 'super-admin'){
        this.obtenerEmpleados()
    }else {
        this.obtenerEmpleadosCoordinador();
    }
  }

  comprobarRolUsuarioBusqueda(rolUsuario: string, busquedaRecibida: string){
    if (rolUsuario == 'super-admin'){
        this._empleadosService.getEmpleadoByNombre(busquedaRecibida).subscribe((empleado) => {
            this.empleados = empleado;
        })

        this.carga = false;
    }else {
        this.obtenerEmpleadosCoordinadorBusqueda(this._authService.getIdFromPayload(), busquedaRecibida);
    }
  }

  obtenerEmpleados(): void {

    this.carga = true;
    this._empleadosService.getAllEmpleados().subscribe((empleados) => {
        this.empleados = empleados;
        this.carga = false;
    })

  }

  obtenerEmpleadosCoordinador() : void {
    this._empleadosService.getEmpleadosByCoordinador(this._authService.getIdFromPayload()).subscribe((empleados) => {
        this.empleados = empleados;
    })
  }

  obtenerEmpleadosCoordinadorBusqueda(idCoordinador: number, busqueda: string){
    this._empleadosService.getEmpleadosCoordinadorByNombre(idCoordinador, busqueda).subscribe((empleados) => {
        this.empleados = empleados;
    })
  }

  obtenerEmpleadosBusqueda(empleado: string){
    console.log(empleado);
  }
}
