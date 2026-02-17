import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Centro } from '../models/Centro';
import { ROUTE_API, ROUTE_CENTRO, ROUTE_CENTROS, ROUTE_DEPARTAMENTO } from '../environments/globals';
import { CentroDTO } from '../Dto/CentroDTO';

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

    getCentroDepartamento(id: number): Observable<Centro>{
        return this._httpClient.get<Centro>(`${ROUTE_DEPARTAMENTO}/departamento/centro/${id}`);
    }

    getCentroByNombre(nombre: string): Observable<Array<Centro>>{
        return this._httpClient.get<Array<Centro>>(`${ROUTE_CENTRO}-nombre/${nombre}`);
    }

    editCentro(centroDto: CentroDTO): Observable<Centro>{
        return this._httpClient.put<Centro>(`${ROUTE_API}addDepartamentoToCentro`, centroDto);
    }

    createCentro(centroDto: CentroDTO): Observable<Centro>{
        return this._httpClient.post<Centro>(`${ROUTE_CENTRO}`, centroDto);
    }
  
}
