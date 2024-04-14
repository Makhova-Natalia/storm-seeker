import { Component, Input } from '@angular/core';
import { MaterialModule } from "../../../material-module";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-one-day-weather-item',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './one-day-weather-item.component.html',
  styleUrl: './one-day-weather-item.component.css'
})
export class OneDayWeatherItemComponent {
  @Input() imageSrc: string;
  @Input() param: string;
  @Input() temperature: string;
  @Input() weatherInfo: string;
  @Input() allowNavigation: boolean;

  constructor(private router: Router) {
  }

  getDayOfWeek(dateString: string): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();

    return daysOfWeek[dayOfWeekIndex];
  }

  isDate(value: string): boolean {
    const date: Date = new Date(value);

    return !isNaN(date.getTime());
  }

  navigateToHomePage() {
    this.router.navigate(['/home']);
  }
}
