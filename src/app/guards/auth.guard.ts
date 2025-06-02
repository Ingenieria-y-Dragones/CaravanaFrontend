import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../security/auth.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
