import { Component } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-search-location',
  standalone: true,
  imports: [ MaterialModule, FormsModule ],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.css'
})
export class SearchLocationComponent {
    location: string = 'Kiev';

    searchLocation() {

    }
}
