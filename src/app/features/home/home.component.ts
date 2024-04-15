import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchLocationComponent } from "./components/search-location/search-location.component";
import { MaterialModule } from "../../material-module";
import { AddFavoriteComponent } from "./components/add-favorite/add-favorite.component";
import { CurrentForecastComponent } from "./components/current-forecast/current-forecast.component";
import { FutureForecastsComponent } from "./components/future-forecasts/future-forecasts.component";
import { WeatherService } from "../../core/services/weather.service";
import { CommonModule } from "@angular/common";
import { Observable, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchLocationComponent,
    MaterialModule,
    AddFavoriteComponent,
    CurrentForecastComponent,
    FutureForecastsComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroyed$$: Subject<void> = new Subject<void>();

  isEmpty$: Observable<boolean>;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.isEmpty$ = this.weatherService.getIsEmpty().pipe(
      takeUntil(this.destroyed$$)
    );
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }
}
