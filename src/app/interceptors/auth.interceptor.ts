import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../security/auth.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // In standalone lambdas, injection is done with the `inject` function
  let auth: AuthService = inject(AuthService);
  let token = auth.token();

  if (token == null) {
    return next(req);
  } else {
    return next(
      req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    );
  }
};
