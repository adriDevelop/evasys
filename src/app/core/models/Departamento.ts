import { Centro } from './Centro';
import { Colectivo } from './Colectivo';
import { Empleado } from './Empleado';

export interface Departamento{
    id_departamento?: number;
    nombre: string;
    centro: Centro,
    empleados: Array<Empleado>,
    colectivos: Array<Colectivo>,
}