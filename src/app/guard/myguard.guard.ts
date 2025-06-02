import { CanActivateFn } from '@angular/router';

export const myguardGuard: CanActivateFn = (route, state) => {
  return true;
};
