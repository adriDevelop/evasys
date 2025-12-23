import { inject, Injectable } from '@angular/core';
import { Empleado } from '../models/Empleado';
import { HttpClient } from '@angular/common/http';
import { ROUTE_EMPLEADO, ROUTE_EMPLEADOS } from '../environments/globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {

    private _httpClient: HttpClient = inject(HttpClient);

    getAllEmpleados(): Observable<Array<Empleado>>{
        return this._httpClient.get<Array<Empleado>>(`${ROUTE_EMPLEADOS}`);
    }

    getEmpleadoById(id: number): Observable<Empleado>{
        return this._httpClient.get<Empleado>(`${ROUTE_EMPLEADO}/${id}`);
    }

    deleteEmpleadoById(id: number){
        return this._httpClient.delete(`${ROUTE_EMPLEADO}/${id}`);
    }

    updateEmpleado(empleado: Empleado): Observable<Empleado>{
        return this._httpClient.put<Empleado>(`${ROUTE_EMPLEADO}`, empleado);
    }

    createEmpleado(idCoordinador: number, idDepartamento: number, empleado: Empleado): Observable<Empleado>{
        return this._httpClient.post<Empleado>(`${ROUTE_EMPLEADO}`, {idCoordinador, idDepartamento, empleado});
    }
  
}
