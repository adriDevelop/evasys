import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComunicationService } from '../../../core/services/comunication-service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth-service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list'
@Component({
  selector: 'app-header',
  imports: [RouterLink, MatCardModule, MatDividerModule, MatListModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy{

    rolUsuario: string;
    nombreCoordinador: string;
    usuarioCoordinador: string;
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
                this.nombreCoordinador = this._authService.getUsernameFromPayload();
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
