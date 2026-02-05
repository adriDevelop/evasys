import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload{
    nombre: string;
    apellidos: string;
    departamento: string;
    id:number;
    ROL: {
        authority: string;
    }[]
}