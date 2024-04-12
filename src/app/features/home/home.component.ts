import { Component } from '@angular/core';
import { SearchLocationComponent } from "./components/search-location/search-location.component";
import { MaterialModule } from "../../material-module";
import { AddFavoriteComponent } from "./components/add-favorite/add-favorite.component";
import { CurrentForecastComponent } from "./components/current-forecast/current-forecast.component";
import { FutureForecastsComponent } from "./components/future-forecasts/future-forecasts.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchLocationComponent,
    MaterialModule,
    AddFavoriteComponent,
    CurrentForecastComponent,
    FutureForecastsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
