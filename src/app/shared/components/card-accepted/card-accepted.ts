import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AcceptedService } from '../../../core/services/accepted-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-card-accepted',
  imports: [AsyncPipe],
  templateUrl: './card-accepted.html',
  styleUrl: './card-accepted.css',
})
export class CardAccepted {

    message: Observable<string>;
    private _acceptedService: AcceptedService = inject(AcceptedService)
    
    constructor(){
        this.message = this._acceptedService.message;
    }
}
