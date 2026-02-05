import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class ComunicationService {

    private _authService = inject(AuthService)

    estadoLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._authService.checkState());
    estadoLogin$: Observable<boolean> = this.estadoLogin.asObservable();

    cambioLogin(nuevoEstado: boolean): void{
        this.estadoLogin.next(nuevoEstado);
    }
  
}
