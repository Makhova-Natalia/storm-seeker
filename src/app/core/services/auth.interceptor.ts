import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { LoadingService } from "./loading.service";
import { catchError, finalize, throwError } from "rxjs";
import { inject } from "@angular/core";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.API_KEY;
  const apiHost = environment.API_HOST;
  const loadingService = inject(LoadingService);

  const modifiedReq = req.clone({
    setParams: {apikey: apiKey, host: apiHost}
  });

  loadingService.setLoading(true);

  return next(modifiedReq).pipe(
    catchError((err) => {
      loadingService.setLoading(false);
      return throwError(err);
    }),
    finalize(() => {
      loadingService.setLoading(false);
    })
  );
}

