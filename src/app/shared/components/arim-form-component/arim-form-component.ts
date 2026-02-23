import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WEIGHTSASISTENCIAENTRANTES } from '../../../core/environments/data-results';

@Component({
  selector: 'app-arim-form-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './arim-form-component.html',
  styleUrl: './arim-form-component.css',
})
export class ArimFormComponent {
  @Input()
  formControl: FormGroup;

  formGroupCompleto: FormGroup = new FormGroup({
    requisitos_Formales: new FormGroup({
      saludo_corporativo: new FormControl(0),
      personalizacion_cliente: new FormControl(0),
      despedida: new FormControl(0),
    }),
    transcurso_De_La_Llamada: new FormGroup({
      escucha_activa: new FormControl(0),
      lenguaje_adecuado_profesional: new FormControl(0),
      vocalizacion_correcta: new FormControl(0),
      empatia: new FormControl(0),
      capacidad_respuesta: new FormControl(0),
    }),
    conocimiento_Tecnico: new FormGroup({
      identificacion_tecnica: new FormControl(0),
      busqueda_informacion: new FormControl(0),
      conocimiento_tecnico: new FormControl(0),
      transmision_tecnica: new FormControl(0),
    }),
    resolucion_llamada: new FormGroup({
      imagen: new FormControl(0),
      alternativas: new FormControl(0),
      confianza: new FormControl(0),
      resolucion: new FormControl(0),
    }),
  });

  formGroupResultado: FormGroup = new FormGroup({
    requisitos_formales_resultado: new FormControl(0),
    transcurso_de_la_llamada_resultado: new FormControl(0),
    conocimiento_tecnico_resultado: new FormControl(0),
    resolucion_llamada_resultado: new FormControl(0),
  });

  formSections: {
    name: string;
    key: string;
    formGroup: FormGroup;
    entries: [string, FormControl][];
  }[] = [];

  ngOnInit(): void {
    this.formSections = Object.entries(
      this.formGroupCompleto.controls as Record<string, FormGroup>
    ).map(([sectionName, formGroup]) => ({
      name: sectionName
        .split('_')
        .map((data) => {
          const firstLetter = data.charAt(0).toUpperCase();
          const restString = data.substring(1);
          return firstLetter + restString;
        })
        .join(' '),
      key: sectionName,
      formGroup: formGroup,
      entries: Object.entries(formGroup.controls) as [string, FormControl][],
    }));

    this.formSections.forEach((section) => {
      section.formGroup.valueChanges.subscribe(() => {
        this.calcularResultadoSeccion(section.key);
      });
    });
  }

  ngOnDestroy(): void {
    this.formControl.get('puntuacion_total_auditoria')?.setValue(0);
  }

  private calcularResultadoSeccion(sectionKey: string): void {
    const formGroup = this.formGroupCompleto.get(sectionKey) as FormGroup;
    if (!formGroup) return;
    const pesosActuales = WEIGHTSASISTENCIAENTRANTES;

    let promedio = 0;

    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup.get(controlName);
      const valorSeleccionado = control?.value;

      if (valorSeleccionado && pesosActuales[controlName] !== undefined) {
        const pesoMaximo = pesosActuales[controlName];
        const puntosObtenidos = (valorSeleccionado / 5) * pesoMaximo;
        promedio += puntosObtenidos;
      }
    });

    const resultadoKey = `${sectionKey.toLowerCase()}_resultado`;
    this.formGroupResultado.get(resultadoKey)?.setValue(promedio);
    this.obtenerResultado();
  }

  obtenerResultado(): void {
    let resultado = 0;
    Object.entries(this.formGroupResultado.controls as Record<string, FormControl>).map(
      ([name, formControl]) => {
        resultado += formControl.value;
      }
    );

    console.log(resultado);
    this.formControl.get('puntuacion_total_auditoria')?.setValue(resultado);
  }

  get puntuaciontotal() {
    return this.formControl.get('puntuacion_total_auditoria')?.value;
  }
}
