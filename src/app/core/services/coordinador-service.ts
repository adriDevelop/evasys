import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinador } from '../models/Coordinador';
import { ROUTE_COORDINADOR, ROUTE_COORDINADORES } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class CoordinadorService {
  private _httpClient: HttpClient = inject(HttpClient);

  getCoordinadoresDepartamentoCentral(
    idDepartamento: number,
    idCentro: number
  ): Observable<Array<Coordinador>> {
    return this._httpClient.get<Array<Coordinador>>(
      `${ROUTE_COORDINADOR}/${idDepartamento}/${idCentro}`
    );
  }

  getCoordinadorById(id_coordinador: number): Observable<Coordinador> {
    return this._httpClient.get<Coordinador>(`${ROUTE_COORDINADOR}/${id_coordinador}`);
  }

  getAllCoordinadores(): Observable<Array<Coordinador>> {
    return this._httpClient.get<Array<Coordinador>>(`${ROUTE_COORDINADORES}`);
  }

  getCoordinadorByNombre(nombre: string): Observable<Array<Coordinador>> {
    return this._httpClient.get<Array<Coordinador>>(`${ROUTE_COORDINADORES}-nombre/${nombre}`);
  }
}
