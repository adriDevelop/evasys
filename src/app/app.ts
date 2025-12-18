import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./pages/content/login/login";
import { EmpleadosList } from "./shared/components/empleados-list/empleados-list";
import { PrincipalEmpleados } from './pages/content/principal-empleados/principal-empleados';
import { PrincipalAuditeles } from "./pages/content/principal-auditeles/principal-auditeles";
import { Header } from "./shared/components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, EmpleadosList, PrincipalEmpleados, PrincipalAuditeles, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('evasys');
}
