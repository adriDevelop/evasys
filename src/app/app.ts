import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { CardMessageError } from "./shared/components/card-message-error/card-message-error";
import { CardAccepted } from "./shared/components/card-accepted/card-accepted";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CardMessageError, CardAccepted],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('evasys');
}
