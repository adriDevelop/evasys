import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Principal } from './components/principal/principal';
import { PrincipalEmpleados } from './components/principal-empleados/principal-empleados';
import { PrincipalAuditeles } from './components/principal-auditeles/principal-auditeles';

export const routes: Routes = [
  { path: 'login', component: Login, pathMatch: 'full' },
  {
    path: '',
    component: Principal,
    children: [
      { path: '', redirectTo: 'empleados', pathMatch: 'full' }, // Opcional: ruta por defecto
      { path: 'empleados', component: PrincipalEmpleados },
      { path: 'auditeles', component: PrincipalAuditeles },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
