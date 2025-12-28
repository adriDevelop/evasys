import { Coordinador } from './Coordinador';
import { Departamento } from './Departamento';

export interface Auditorias{
    id_auditoria?: string,
    tipo?: string, 
    expediente: string;
    fecha: string;
    puntuacion_total_auditoria: number;
    departamento?: Departamento;
    coordinador_auditel?: Coordinador;
    coordinador?: number;
    empleado_auditado?: number;
    colectivo?: number;
}