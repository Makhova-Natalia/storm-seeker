import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchLocationComponent } from "./components/search-location/search-location.component";
import { MaterialModule } from "../../material-module";
import { AddFavoriteComponent } from "./components/add-favorite/add-favorite.component";
import { CurrentForecastComponent } from "./components/current-forecast/current-forecast.component";
import { FutureForecastsComponent } from "./components/future-forecasts/future-forecasts.component";
import { WeatherService } from "../../core/services/weather.service";
import { CommonModule } from "@angular/common";
import { Observable, Subject, takeUntil } from "rxjs";
import { LineChartComponent } from "./components/line-chart/line-chart.component";
import { FormsModule } from "@angular/forms";
import { LoadingService } from "../../core/services/loading.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchLocationComponent,
    MaterialModule,
    AddFavoriteComponent,
    CurrentForecastComponent,
    FutureForecastsComponent,
    CommonModule,
    LineChartComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroyed$$: Subject<void> = new Subject<void>();
  loading$: Observable<boolean>;

  showForecastMode: boolean = true;
  isEmpty$: Observable<boolean>;

  constructor(
    private weatherService: WeatherService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.loading$ = this.loadingService.getLoading();
    this.isEmpty$ = this.weatherService.getIsEmpty().pipe(
      takeUntil(this.destroyed$$)
    );
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }
}
