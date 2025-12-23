import { Auditorias } from './Auditorias';
import { Centro } from './Centro';
import { Coordinador } from './Coordinador';
import { Departamento } from './Departamento';

export interface Empleado{
    id_empleado?: number;
    nuss?: number;
    nombre: string;
    apellidos: string;
    email: string;
    direccion: string;
    centro?: Centro;
    fecha_alta?: String;
    fecha_baja?: Date;
    actividad: string;
    coordinador?: Coordinador;
    departamento?: Departamento;
    id_departamento?: number,
    id_centro?: number,
    id_coordinador?: number,
    activo?: number;
    auditorias: Array<Auditorias>
}