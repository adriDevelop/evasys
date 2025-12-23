import { Centro } from './Centro';
import { Empleado } from './Empleado';

export interface Departamento{
    id_departamento?: number;
    nombre: string;
    centro: Centro,
    empleados: Array<Empleado>
}