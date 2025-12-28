import { Auditorias } from '../models/Auditorias';

export interface AuditelDTO{
    audicion: Auditorias,
    idEmpleado: number,
    idCoordinadorEmpleado: number,
    idCoordinadorAuditel: number,
    idDepartamento: number,
    idColectivo: number
}