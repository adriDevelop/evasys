import { PrincipalEmpleados } from './principal-empleados/principal-empleados';
import { PrincipalAuditeles } from './principal-auditeles/principal-auditeles';
import { EditarEmpleado } from './editar-empleado/editar-empleado';
import { EditarAuditelEmpleado } from './editar-auditel-empleado/editar-auditel-empleado';
import { CrearEmpleado } from './crear-empleado/crear-empleado';
import { AgregarAuditel } from './agregar-auditel/agregar-auditel';
import { PrincipalCentros } from './principal-centros/principal-centros';
import { PrincipalCoordinador } from './principal-coordinador/principal-coordinador';
import { PrincipalDepartamentos } from './principal-departamentos/principal-departamentos';
import { EditarDepartamento } from './editar-departamento/editar-departamento';

export const CONTENT_ROUTES = [
    {
        path: 'listadoEmpleados',
        component: PrincipalEmpleados
    },
    {
        path: 'listadoAuditeles',
        component: PrincipalAuditeles
    },
    {
        path: 'listadoCentros',
        component: PrincipalCentros
    },
    {
        path: 'listadoCoordinadores',
        component: PrincipalCoordinador
    },
    {
        path: 'listadoDepartamentos',
        component: PrincipalDepartamentos
    },
    {
        path: 'editarEmpleado/:id',
        component: EditarEmpleado
    },
    {
        path: 'editarAuditel/:id',
        component: EditarAuditelEmpleado
    },
    {
        path: 'editarDepartamento/:id',
        component: EditarDepartamento
    },
    {
        path: 'agregarEmpleado',
        component: CrearEmpleado
    },
    {
        path: 'agregarAuditel',
        component: AgregarAuditel
    }
]