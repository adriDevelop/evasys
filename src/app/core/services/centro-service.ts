import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Centro } from '../models/Centro';
import { ROUTE_CENTRO, ROUTE_CENTROS } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class CentroService {

    private _httpClient: HttpClient = inject(HttpClient);

    getCentroById(id: number): Observable<Centro>{
        return this._httpClient.get<Centro>(`${ROUTE_CENTRO}/${id}`);
    }

    getAllCentros(): Observable<Array<Centro>>{
        return this._httpClient.get<Array<Centro>>(`${ROUTE_CENTROS}`);
    }
  
}
