import { Component } from '@angular/core';
import { MaterialModule } from "../../../material-module";

@Component({
  selector: 'app-one-day-weather-item',
  standalone: true,
  imports: [ MaterialModule ],
  templateUrl: './one-day-weather-item.component.html',
  styleUrl: './one-day-weather-item.component.css'
})
export class OneDayWeatherItemComponent {

}
