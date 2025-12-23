import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcceptedService {

    private messageSubject = new Subject<string>();
    message = this.messageSubject.asObservable();

    showMessage(messageAccepted: string, duration = 4000){
        this.messageSubject.next(messageAccepted);

        timer(duration).subscribe(() => {
            this.messageSubject.next("");
        })
    }

}
