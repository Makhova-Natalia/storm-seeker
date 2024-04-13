import { Component } from '@angular/core';
import { MaterialModule } from "../../../../material-module";
import { NgClass, NgStyle } from "@angular/common";

@Component({
  selector: 'app-add-favorite',
  standalone: true,
  imports: [ MaterialModule, NgClass ],
  templateUrl: './add-favorite.component.html',
  styleUrl: './add-favorite.component.css'
})
export class AddFavoriteComponent {
  isFavorite: boolean = false;

  toggleFavorite(){
    this.isFavorite = !this.isFavorite;
  }

}
