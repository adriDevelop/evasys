import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WEIGHTSASISTENCIASALIENTES } from '../../../core/environments/data-results';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-salientes-form-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './salientes-form-component.html',
  styleUrl: './salientes-form-component.css',
})
export class SalientesFormComponent implements OnInit, OnDestroy {
  @Input()
  formControl: FormGroup;

  formGroupCompleto: FormGroup = new FormGroup({
    requisitos_Formales: new FormGroup({
      presentacion: new FormControl(0),
      despedida: new FormControl(0),
      formulas_cortesia: new FormControl(0),
    }),
    comunicacion_Con_El_Cliente: new FormGroup({
      vocalizacion_correcta: new FormControl(0),
      evita_tono_monotono: new FormControl(0),
      usa_lenguaje_adecuado: new FormControl(0),
      amabilidad: new FormControl(0),
    }),
    comprension_Con_El_Interlocutor: new FormGroup({
      escucha_activa: new FormControl(0),
      empatia_con_interlocutor: new FormControl(0),
      capacidad_respuesta: new FormControl(0),
    }),
    resolucion: new FormGroup({
      ofrece_agilmente_solucion: new FormControl(0),
      ofrece_mejor_solucion: new FormControl(0),
      gestiona_optimizacion_costes: new FormControl(0),
      capacidad_encontrar_ofrecer_alternativa: new FormControl(0),
      claridad_explicaciones: new FormControl(0),
      seguridad_respuestas: new FormControl(0),
      gestion_conflictos_situaciones_dificiles: new FormControl(0),
      gestion_silencios: new FormControl(0),
    }),
    gestion_Actividad: new FormGroup({
      grabacion_datos: new FormControl(0),
      cumplimento_plazos: new FormControl(0),
    }),
  });

  formGroupResultado: FormGroup = new FormGroup({
    requisitos_formales_resultado: new FormControl(0),
    comunicacion_con_el_cliente_resultado: new FormControl(0),
    comprension_con_el_interlocutor_resultado: new FormControl(0),
    resolucion_resultado: new FormControl(0),
    gestion_actividad_resultado: new FormControl(0),
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
    const pesosActuales = WEIGHTSASISTENCIASALIENTES;

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
