import { Departamento } from './Departamento';

export interface Central{
    id?: number;
    nombre: string;
    departamentos: Array<Departamento>
}