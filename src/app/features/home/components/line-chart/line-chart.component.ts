import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from "chart.js";
import { MaterialModule } from "../../../../material-module";
import { DailyForecast } from "../../../../core/models/weather.model";
import { WeatherService } from "../../../../core/services/weather.service";
import { DAYS_OF_WEEK } from "../../../../core/models/weatherData.config";

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ MaterialModule ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit, AfterViewInit{
  private fiveDaysForecasts: DailyForecast[] = [];
  private daysOfWeek = DAYS_OF_WEEK;

  chart: any;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.chart = document.getElementById('chart');
    Chart.register(...registerables);
    this.weatherService.getFiveForecasts().subscribe((list: DailyForecast[]) => {
      this.fiveDaysForecasts = list;
    })
  }

  private loadChart(): void {
    new Chart(this.chart, {
      type: 'line',
      data: {
        labels: this.getDaysOfWeek(this.fiveDaysForecasts),
        datasets: [
          {
            label: 'Day',
            data: this.getDayTemperatures(this.fiveDaysForecasts),
            borderColor: '#BBD2D7',
            fill: false
          },
          {
            label: 'Night',
            data: this.getNightTemperatures(this.fiveDaysForecasts),
            borderColor: '#467986',
            fill: false
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          }
        },
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    })
  }

  ngAfterViewInit() {
    this.loadChart()
  }

  private getDaysOfWeek(forecasts: DailyForecast[]): string[] {
    const days: string[] = [];

    forecasts.forEach(forecast => {
      const date = new Date(forecast.Date);
      const dayOfWeekIndex = date.getDay();
      days.push(this.daysOfWeek[dayOfWeekIndex]);
    })

    return days;
  }

  private getDayTemperatures(forecasts: DailyForecast[]): string[] {
    return forecasts.map(forecast => forecast.Temperature.Maximum.Value);
  }

  private getNightTemperatures(forecasts: DailyForecast[]): string[] {
    return forecasts.map(forecast => forecast.Temperature.Minimum.Value);
  }
}
