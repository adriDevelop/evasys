import { Component, inject } from '@angular/core';
import { ErrorService } from '../../../core/services/error-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-card-message-error',
  imports: [AsyncPipe],
  templateUrl: './card-message-error.html',
  styleUrl: './card-message-error.css',
})
export class CardMessageError{

    message: Observable<string>;

    private _errorService: ErrorService = inject(ErrorService)

    constructor(){
        this.message = this._errorService.message;
    }


    

}
