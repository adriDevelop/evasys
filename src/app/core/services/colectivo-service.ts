import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Colectivo } from '../models/Colectivo';
import { Observable } from 'rxjs';
import { ROUTE_COLECTIVO, ROUTE_COLECTIVOS } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class ColectivoService {
  private _httpClient: HttpClient = inject(HttpClient);

  obtenerColectivoById(id: number): Observable<Colectivo> {
    return this._httpClient.get<Colectivo>(`${ROUTE_COLECTIVO}/${id}`);
  }

  obtenerTodosColectivos(): Observable<Array<Colectivo>> {
    return this._httpClient.get<Array<Colectivo>>(`${ROUTE_COLECTIVOS}`);
  }
}
