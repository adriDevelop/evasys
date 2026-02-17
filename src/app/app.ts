import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { CardMessageError } from "./shared/components/card-message-error/card-message-error";
import { CardAccepted } from "./shared/components/card-accepted/card-accepted";
import { ComunicationService } from './core/services/comunication-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CardMessageError, CardAccepted, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

    estadoLogin: boolean;

    constructor(
        private _comunicationService: ComunicationService = inject(ComunicationService),
    ){

    }

  ngOnInit(): void {
    this._comunicationService.estadoLogin.subscribe((estadoLogin) => {
        this.estadoLogin = estadoLogin;
    })
  }

  protected readonly title = signal('evasys');
}
