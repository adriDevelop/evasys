import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./components/login/login";
import { EmpleadosList } from "./components/empleados-list/empleados-list";
import { PrincipalEmpleados } from "./components/principal-empleados/principal-empleados";
import { PrincipalAuditeles } from "./components/principal-auditeles/principal-auditeles";
import { Header } from "./components/header/header";
import { Principal } from "./components/principal/principal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, EmpleadosList, PrincipalEmpleados, PrincipalAuditeles, Header, Principal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('evasys');
}
