import { Central } from './Central';
import { Empleado } from './Empleado';

export interface Departamento{
    id?: number;
    nombre: string;
    central: Central,
    empleados: Array<Empleado>
}