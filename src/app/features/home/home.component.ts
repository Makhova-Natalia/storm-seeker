import { Component } from '@angular/core';
import { SearchLocationComponent } from "./components/search-location/search-location.component";
import { MaterialModule } from "../../material-module";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ SearchLocationComponent, MaterialModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
