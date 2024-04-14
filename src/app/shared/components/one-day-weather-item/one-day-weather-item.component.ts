import { Component, Input } from '@angular/core';
import { MaterialModule } from "../../../material-module";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-one-day-weather-item',
  standalone: true,
  imports: [ MaterialModule, CommonModule ],
  templateUrl: './one-day-weather-item.component.html',
  styleUrl: './one-day-weather-item.component.css'
})
export class OneDayWeatherItemComponent {
  @Input() imageSrc: string;
  @Input() param: string;
  @Input() temperature: string;
  @Input() weatherInfo: string;

  getDayOfWeek(dateString: string): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();

    return daysOfWeek[dayOfWeekIndex];
  }

  isDate(value: any): boolean {
    return new Date(value) instanceof Date;
  }
}
