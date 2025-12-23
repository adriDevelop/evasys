import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../../../core/models/Empleado';
import { EmpleadosService } from '../../../core/services/empleados-service';
import { Centro } from '../../../core/models/Centro';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-empleado',
  imports: [FormsModule],
  templateUrl: './editar-empleado.html',
  styleUrl: './editar-empleado.css',
})
export class EditarEmpleado implements OnInit {
  empleado: Empleado;
  centro: Centro;

  constructor(
    private route: ActivatedRoute = inject(ActivatedRoute),
    private _empleadosService: EmpleadosService = inject(EmpleadosService),
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this._empleadosService.getEmpleadoById(id).subscribe((e) => {
      this.empleado = e;
      console.log(e);
    });
  }

  editarUsuario(empleado: Empleado){
    this._empleadosService.updateEmpleado(empleado).subscribe((e) => {
        console.log("Se ha actualizado correctamente el empleado");
    })
  }
}
