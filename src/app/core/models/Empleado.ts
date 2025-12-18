import { Departamento } from './Departamento';

export interface Empleado{
    id?: number;
    nuss?: number;
    nombre: string;
    apellidos: string;
    email: string;
    direccion: string;
    departamento: Departamento,
}