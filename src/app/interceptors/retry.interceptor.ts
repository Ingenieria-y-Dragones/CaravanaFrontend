import { HttpInterceptorFn } from '@angular/common/http';
import { retry, timeout } from 'rxjs/operators';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    timeout(30000), // 30 segundos
    retry(3)        // Reintenta hasta 3 veces
  );
};
