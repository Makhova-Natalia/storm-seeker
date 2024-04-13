import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from "../../../environments/environment";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.API_KEY;
  const apiHost = environment.API_HOST;

  const modifiedReq = req.clone({
    setParams: { apikey: apiKey, host: apiHost }
  });

  return next(modifiedReq);
};
