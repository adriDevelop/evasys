import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { ComunicationService } from '../../../core/services/comunication-service';
import { LoginDto } from '../../../core/Dto/LoginDto';
import { Router } from '@angular/router';
import { ErrorService } from '../../../core/services/error-service';
import { NgForm, ɵInternalFormsSharedModule, FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{

    constructor(
        private _authService: AuthService = inject(AuthService),
        private _communicationService: ComunicationService = inject(ComunicationService),
        private _router: Router,
        private _errorService: ErrorService = inject(ErrorService)
    ){}


    ngOnInit(): void {
        if (this._authService.checkState()){
            this._router.navigate(['/empleados/listadoEmpleados']);
        }
    }

    loguearse(login: LoginDto){
        this._authService.login(login).subscribe({
            next: (response) => {
                this._authService.setTokenLocalStorage(response.jwt, response.refreshToken);
                this._communicationService.cambioLogin(true);
                this._router.navigate(['/empleados/listadoEmpleados']);
            },

            error: (error) => {
                if (error.status === 500){
                    console.log("hola");
                    this._errorService.showMessageError("Datos introducidos incorrectos");
                }
            }
        })
    }

}
