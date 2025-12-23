import { Departamento } from './Departamento';

export interface Centro{
    id_centro?: number;
    nombre: string;
    departamentos: Array<Departamento>
}