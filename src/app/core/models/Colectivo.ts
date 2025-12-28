import { Auditorias } from './Auditorias';
import { Departamento } from './Departamento';

export interface Colectivo{
    id_colectivo?: number,
    nombre: string,
    activo: number,
    departamentos: Array<Departamento>,
    audiciones?: Array<Auditorias>,
}