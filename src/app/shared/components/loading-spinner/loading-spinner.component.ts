import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from "../../../core/services/loading.service";
import { MaterialModule } from "../../../material-module";
import { CommonModule } from "@angular/common";
import { Observable, tap } from "rxjs";

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent{
  isLoaded$: Observable<boolean> = this.loadingService.getLoading().pipe(
    tap(() => this.cdRef.detectChanges()),
  );

  constructor(
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef
  ) {}
}
