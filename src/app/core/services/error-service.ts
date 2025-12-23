import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  
    // Obtengo el mensaje como un Subject de RxJS
    private messageSubject = new Subject<string>();
    // Obtengo el mensaje como un observable
    message = this.messageSubject.asObservable();

    // Ahora creo la función que va a mostrar el mensaje de error
    showMessageError(messageError: string, duration = 4000){

        // Le asigno el mensaje a messageSubject
        this.messageSubject.next(messageError);

        // Limpio el message subject cuando ya ha terminado el tiempo
        timer(duration).subscribe(() => {
            this.messageSubject.next("");
        })
    }
}
