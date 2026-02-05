import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComunicationService } from '../../../core/services/comunication-service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy{

    rolUsuario: string;
    estaLogueado: boolean;
    subscripcion: Subscription;

    constructor(
        private _comunicationService: ComunicationService = inject(ComunicationService),
        private _authService: AuthService = inject(AuthService),
    ){}

    ngOnInit(): void {
        this.subscripcion = this._comunicationService.estadoLogin$.subscribe({
            next: (estado) => {
                this.estaLogueado = estado;
                this.rolUsuario = this._authService.getRolFromPayload();
                console.log(this.estaLogueado);
                console.log(this.rolUsuario);
            } 
        })
    }

    cerrarSesion(){
        this._authService.logout();
        this._comunicationService.cambioLogin(false);
    }
    
    ngOnDestroy(): void {
        this.subscripcion.unsubscribe();
    }

}
