import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = ():Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
          .pipe(
            tap( isAuthenticated => {
              if ( isAuthenticated ) router.navigate(['./']);
            }),
            map( isAuthenticated => !isAuthenticated )
          )
}

export const publicGuardCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]): boolean | Observable<boolean> => {
  console.log('Can Match');
  console.log({ route, segments });
  return checkAuthStatus();
};

export const publicGuardCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> => {
  console.log('Can Activate');
  console.log({ route, state });

  return checkAuthStatus();
};