import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./shared/components/header/header.component";
import { MaterialModule } from "./material-module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
