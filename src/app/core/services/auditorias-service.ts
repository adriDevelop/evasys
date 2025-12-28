import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auditorias } from '../models/Auditorias';
import { ROUTE_AUDITORIA, ROUTE_AUDITORIAS } from '../environments/globals';
import { AuditelDTO } from '../Dto/AuditelDto';

@Injectable({
  providedIn: 'root',
})
export class AuditoriasService {

    constructor(
        private _httpService: HttpClient = inject(HttpClient),
    ){}

    getAuditorias(): Observable<Array<Auditorias>>{
        return this._httpService.get<Array<Auditorias>>(`${ROUTE_AUDITORIAS}`);
    }

    createAuditoria(auditoriaDto: AuditelDTO){
        return this._httpService.post<Auditorias>(`${ROUTE_AUDITORIA}`, auditoriaDto);
    }
  
}
