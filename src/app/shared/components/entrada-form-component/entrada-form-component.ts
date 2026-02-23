import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { WEIGHTSASISTENCIAENTRANTES } from '../../../core/environments/data-results';

@Component({
  selector: 'app-entrada-form-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './entrada-form-component.html',
  styleUrl: './entrada-form-component.css',
})
export class EntradaFormComponent implements OnInit, OnDestroy {
  @Input()
  formControl: FormGroup;

  formGroupCompleto: FormGroup = new FormGroup({
    requisitos_Formales: new FormGroup({
      recepcion_llamada: new FormControl(0),
      saludo_corporativo: new FormControl(0),
      despedida_corporativa: new FormControl(0),
      personalizacion_cliente: new FormControl(0),
      formulas_cortesia: new FormControl(0),
      realiza_pregunta_estimulo: new FormControl(0),
    }),
    comunicacion_Con_El_Cliente: new FormGroup({
      vocalizacion_correcta: new FormControl(),
      evita_tono_monotono: new FormControl(),
      usa_lenguaje_adecuado: new FormControl(),
      amabilidad: new FormControl(),
      cercania_calidad_humana: new FormControl(),
      gestion_silencios_esperas: new FormControl(),
      seguridad_respuestas: new FormControl(),
    }),
    resolucion: new FormGroup({
      ofrece_agilmente_solucion: new FormControl(),
      ofrece_mejor_solucion: new FormControl(),
      capacidad_encontrar_ofrecer_alternativa: new FormControl(),
      gestiona_optimizacion_costes: new FormControl(),
      claridad_explicaciones: new FormControl(),
      indica_correctamente_pasos_seguir: new FormControl(),
      muestra_buena_imagen_servicio: new FormControl(),
      gestion_conflictos_situaciones_dificiles: new FormControl(),
    }),
    comprension_Del_Cliente: new FormGroup({
      escucha_activa: new FormControl(),
      empatia_con_el_cliente: new FormControl(),
      capacidad_encontrar_ofrecer_alternativa: new FormControl(),
    }),
    gestion_Actividad: new FormGroup({
      realiza_argumentario_percance: new FormControl(),
      completa_expediente_correctamente: new FormControl(),
      duracion_llamada_adapta_dificultad: new FormControl(),
    }),
    ofrece_Taller_Concertado: new FormGroup({
      ofrece_taller_concertado: new FormControl(),
    }),
    satisfaccion_Cliente: new FormGroup({
      satisfaccion_cliente: new FormControl(0),
    }),
  });

  formGroupResultado: FormGroup = new FormGroup({
    requisitos_formales_resultado: new FormControl(0),
    comunicacion_con_el_cliente_resultado: new FormControl(0),
    comprension_del_cliente_resultado: new FormControl(0),
    resolucion_resultado: new FormControl(0),
    gestion_actividad_resultado: new FormControl(0),
    ofrece_taller_concertado_resultado: new FormControl(0),
    satisfaccion_cliente_resultado: new FormControl(0),
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
