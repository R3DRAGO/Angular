import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CarFromComponent} from "./components/car-from/car-from.component";
import {CarsComponent} from "./components/cars/cars.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarFromComponent, CarsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
}
