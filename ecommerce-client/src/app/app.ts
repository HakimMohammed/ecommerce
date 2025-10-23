import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CustomerList} from './features/customers/pages/customer-list/customer-list';
import {Navbar} from './shared/templates/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-client');
}
