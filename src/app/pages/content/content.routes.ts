import { PrincipalEmpleados } from './principal-empleados/principal-empleados';
import { PrincipalAuditeles } from './principal-auditeles/principal-auditeles';
import { EditarEmpleado } from './editar-empleado/editar-empleado';
import { EditarAuditelEmpleado } from './editar-auditel-empleado/editar-auditel-empleado';
import { CrearEmpleado } from './crear-empleado/crear-empleado';
import { AgregarAuditel } from './agregar-auditel/agregar-auditel';

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
        path: 'editarEmpleado/:id',
        component: EditarEmpleado
    },
    {
        path: 'editarAuditel/:id',
        component: EditarAuditelEmpleado
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