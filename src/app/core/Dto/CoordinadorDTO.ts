import { Empleado } from '../models/Empleado';

export interface CoordinadorDTO {
    id_coordinador?: number,
    nombre: string,
    apellidos: string,
    usuario: string,
    rol: string,
    departamento: number,
    centro: number,
    empleados: Array<Empleado>
}