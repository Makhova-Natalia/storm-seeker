import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from "../../material-module";
import {
  OneDayWeatherItemComponent
} from "../../shared/components/one-day-weather-item/one-day-weather-item.component";
import { FavoriteLocation } from "../../core/models/weather.model";
import { WeatherService } from "../../core/services/weather.service";
import { of, Subject, switchMap, takeUntil, tap } from "rxjs";
import { ICONS } from "../../core/models/weatherData.config";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MaterialModule, OneDayWeatherItemComponent, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private destroyed$$: Subject<void> = new Subject<void>();
  readonly ICON_URL: string = '../../../../assets/img/';
  favoritesList: FavoriteLocation[] = [];

  ICONS_NAME: { [key: string]: string } = ICONS;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.getFavoritesList().pipe(
      takeUntil(this.destroyed$$),
      switchMap((list: FavoriteLocation[]) => {
        if (list.length) {
          return of(list)
        } else {
          const storageList = this.weatherService.getFavoritesListFromStorage();
          return storageList ? of(storageList) : of([]);
        }
      }),
      tap((list: FavoriteLocation[]) => {
        this.favoritesList = list;
      })).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }
}
