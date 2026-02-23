import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WEIGHTSASISTENCIAENTRANTES, WEIGHTSAVJ } from '../../../core/environments/data-results';

@Component({
  selector: 'app-avj-form-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './avj-form-component.html',
  styleUrl: './avj-form-component.css',
})
export class AvjFormComponent {
  @Input()
  formControl: FormGroup;

  formGroupCompleto: FormGroup = new FormGroup({
    requisitos_Formales: new FormGroup({
      recepcion_llamada_saludo_corporativo: new FormControl(0),
      despedida_corporativa: new FormControl(0),
      personalizacion_cliente: new FormControl(0),
      formulas_cortesia: new FormControl(0),
      lee_correctamente_lopd: new FormControl(0),
    }),
    comunicacion_Con_El_Cliente: new FormGroup({
      vocalizacion_correcta_tono_adecuado: new FormControl(0),
      usa_lenguaje_adecuado_profesional: new FormControl(0),
      amabilidad: new FormControl(0),
      cercania_calidad_humana: new FormControl(0),
      gestion_silencios_esperas: new FormControl(0),
      seguridad_respuestas: new FormControl(0),
    }),
    comprension_Del_Cliente: new FormGroup({
      escucha_activa: new FormControl(0),
      empatia: new FormControl(0),
    }),
    resolucion: new FormGroup({
      claridad_explicaciones_y_proximos_pasos: new FormControl(0),
      muestra_buena_imagen_servicio: new FormControl(0),
      gestion_conflictos_situaciones_dificiles: new FormControl(0),
      duracion_llamada_adapta_dificultad: new FormControl(0),
    }),
    gestion_De_La_Actividad: new FormGroup({
      abre_expedientes_relacionados: new FormControl(0),
      gestiona_optimizacion_costes: new FormControl(0),
      completa_expediente_correcamente: new FormControl(0),
      hace_uso_correcto_anotaciones: new FormControl(0),
    }),
    uso_De_La_Red: new FormGroup({
      se_ofrece_telemedicina: new FormControl(0),
      utiliza_red_medica_adecuadamente: new FormControl(0),
    }),
  });

  formGroupResultado: FormGroup = new FormGroup({
    requisitos_formales_resultado: new FormControl(0),
    comunicacion_con_el_cliente_resultado: new FormControl(0),
    comprension_del_cliente_resultado: new FormControl(0),
    resolucion_resultado: new FormControl(0),
    gestion_de_la_actividad_resultado: new FormControl(0),
    uso_de_la_red_resultado: new FormControl(0),
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
    const pesosActuales = WEIGHTSAVJ;

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
