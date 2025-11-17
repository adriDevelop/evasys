import { Component } from '@angular/core';
import { Header } from "../header/header";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principal',
  imports: [Header, RouterOutlet],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {

}
