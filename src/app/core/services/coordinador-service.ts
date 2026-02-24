import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinador } from '../models/Coordinador';
import { ROUTE_COORDINADOR, ROUTE_COORDINADORES } from '../environments/globals';
import { CoordinadorCentroDTO } from '../Dto/CoordinadorCentroDTO';

@Injectable({
  providedIn: 'root',
})
export class CoordinadorService {
  private _httpClient: HttpClient = inject(HttpClient);

  getCoordinadoresDepartamentoCentral(
    idDepartamento: number,
    idCentro: number,
  ): Observable<Array<Coordinador>> {
    return this._httpClient.get<Array<Coordinador>>(
      `${ROUTE_COORDINADOR}/${idDepartamento}/${idCentro}`,
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

  actualizarCoordinador(coordinadorDto: CoordinadorCentroDTO): Observable<Coordinador> {
    return this._httpClient.put<Coordinador>(`${ROUTE_COORDINADOR}-centro`, coordinadorDto);
  }

  crearCoordinador(coordinadorDto: CoordinadorCentroDTO): Observable<Coordinador> {
    return this._httpClient.post<Coordinador>(`${ROUTE_COORDINADOR}`, coordinadorDto);
  }

  cambiarContraseñaCoordinador(id_coordinador: number, password: string): Observable<Coordinador> {
    return this._httpClient.put<Coordinador>(`${ROUTE_COORDINADOR}-password`, {
      idCoordinador: id_coordinador,
      password: password,
    });
  }
}
