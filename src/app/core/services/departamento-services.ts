import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Departamento } from '../models/Departamento';
import { Observable } from 'rxjs';
import { ROUTE_DEPARTAMENTO, ROUTE_DEPARTAMENTOS } from '../environments/globals';
import { DepartamentoDTO } from '../Dto/DepartamentoDTO';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoServices {
  private _httpClient: HttpClient = inject(HttpClient);

  getAllDepartamentos(): Observable<Array<Departamento>> {
    return this._httpClient.get<Array<Departamento>>(`${ROUTE_DEPARTAMENTOS}`);
  }

  getDepartamentoByName(name: string): Observable<Array<Departamento>> {
    return this._httpClient.get<Array<Departamento>>(`${ROUTE_DEPARTAMENTO}-nombre/${name}`);
  }

  getDepartamentoById(id_departamento: number): Observable<Departamento> {
    return this._httpClient.get<Departamento>(`${ROUTE_DEPARTAMENTO}/${id_departamento}`);
  }

  editarDepartamento(departamentoDTO: DepartamentoDTO): Observable<Departamento> {
    return this._httpClient.put<Departamento>(`${ROUTE_DEPARTAMENTO}`, departamentoDTO);
  }

  crearDepartamento(departamentoDTO: DepartamentoDTO): Observable<Departamento> {
    return this._httpClient.post<Departamento>(`${ROUTE_DEPARTAMENTO}`, departamentoDTO);
  }
}
