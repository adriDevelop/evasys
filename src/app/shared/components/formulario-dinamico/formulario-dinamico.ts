import {
  Component,
  EnvironmentInjector,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntradaFormComponent } from '../entrada-form-component/entrada-form-component';
import { SalientesFormComponent } from '../salientes-form-component/salientes-form-component';
import { AbogadosFormComponent } from '../abogados-form-component/abogados-form-component';
import { AvjFormComponent } from '../avj-form-component/avj-form-component';
import { ArimFormComponent } from '../arim-form-component/arim-form-component';
import { AdministrativoFormComponent } from '../administrativo-form-component/administrativo-form-component';
import { ImpagosFormComponent } from '../impagos-form-component/impagos-form-component';
import { InboudFormComponent } from '../inboud-form-component/inboud-form-component';
import { OutboundFormComponent } from '../outbound-form-component/outbound-form-component';
import { SoporteFormComponent } from '../soporte-form-component/soporte-form-component';

@Component({
  selector: 'app-formulario-dinamico',
  imports: [],
  templateUrl: './formulario-dinamico.html',
  styleUrl: './formulario-dinamico.css',
})
export class FormularioDinamico implements OnChanges {
  @Input()
  tipoFormulario: string;

  @Input()
  formControlPadre: FormGroup;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  private injector = inject(EnvironmentInjector);

  private componentMap: Record<string, Type<any>> = {
    entrantes: EntradaFormComponent,
    salientes: SalientesFormComponent,
    abogados: AbogadosFormComponent,
    avj: AvjFormComponent,
    arim: ArimFormComponent,
    administrativo: AdministrativoFormComponent,
    impagos: ImpagosFormComponent,
    inboud: InboudFormComponent,
    outbound: OutboundFormComponent,
    soporte: SoporteFormComponent,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipoFormulario'] && this.formControlPadre) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    this.container.clear();

    const component = this.componentMap[this.tipoFormulario];

    if (!component) return;

    const componentRef = this.container.createComponent(component, {
      environmentInjector: this.injector,
    });

    componentRef.instance.formControl = this.formControlPadre;
  }
}
