import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  WEIGHTSADMINISTRATIVO,
  WEIGHTSASISTENCIAENTRANTES,
} from '../../../core/environments/data-results';

@Component({
  selector: 'app-administrativo-form-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './administrativo-form-component.html',
  styleUrl: './administrativo-form-component.css',
})
export class AdministrativoFormComponent implements OnInit {
  @Input()
  formControl: FormGroup;

  formGroupCompleto: FormGroup = new FormGroup({
    requisitos_Formales: new FormGroup({
      saludo_corporativo: new FormControl(0),
      solicita_datos_correctamente: new FormControl(0),
      personalizacion_cliente: new FormControl(0),
    }),
    transcurso_De_La_Llamada: new FormGroup({
      escucha_activa: new FormControl(0),
      uso_tono_volumen_adecuados: new FormControl(0),
      vocalizacion_correcta: new FormControl(0),
      velocidad_adecuada: new FormControl(0),
      uso_correcto_lenguaje: new FormControl(0),
      amabilidad: new FormControl(0),
      capacidad_respuesta: new FormControl(0),
      rapidez_manejo_sistema: new FormControl(0),
    }),
    cierre_llamada: new FormGroup({
      claridad_explicaciones: new FormControl(0),
      ofrece_agilmente_solucion: new FormControl(0),
      muestra_buena_imagen_servicio: new FormControl(0),
      gestion_conflictos_situaciones_dificiles: new FormControl(0),
      gestion_silencios: new FormControl(0),
    }),
    back: new FormGroup({
      completa_correctamente_expediente: new FormControl(0),
      notas_correctas_aclaratorias: new FormControl(0),
      duracion_llamada_adapta_dificultad: new FormControl(0),
    }),
  });

  formGroupResultado: FormGroup = new FormGroup({
    requisitos_formales_resultado: new FormControl(0),
    transcurso_de_la_llamada_resultado: new FormControl(0),
    cierre_llamada_resultado: new FormControl(0),
    back_resultado: new FormControl(0),
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
    const pesosActuales = WEIGHTSADMINISTRATIVO;

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
