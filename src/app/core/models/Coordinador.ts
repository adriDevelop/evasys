import { Centro } from './Centro';
import { Departamento } from './Departamento';

export interface Coordinador{
        id_coordinador?: number,
        id_rrhh: number,
        nombre: string,
        apellidos: string,
        usuario: string,
        password: string,
        activo: number,
        centro: Centro,
        rol?: string,
        departamento: Departamento
}