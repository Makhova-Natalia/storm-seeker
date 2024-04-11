import { Component } from '@angular/core';
import { SearchLocationComponent } from "./components/search-location/search-location.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ SearchLocationComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
