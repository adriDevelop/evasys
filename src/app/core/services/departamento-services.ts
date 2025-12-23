import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Departamento } from '../models/Departamento';
import { Observable } from 'rxjs';
import { ROUTE_DEPARTAMENTOS } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoServices {

    private _httpClient: HttpClient = inject(HttpClient);

    getAllDepartamentos(): Observable<Array<Departamento>>{
        return this._httpClient.get<Array<Departamento>>(`${ROUTE_DEPARTAMENTOS}`);
    }
  
}
