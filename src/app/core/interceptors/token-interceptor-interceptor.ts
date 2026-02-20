import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ErrorComponent } from '../../shared/components/error-component/error-component';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let _authService = inject(AuthService);
  let token = _authService.getToken();

  if (token && !req.url.includes('/authenticate') && !req.url.includes('/regenerarToken')) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(cloneReq).pipe(
      catchError((err) => {
        if (err.status == 403) {
          return _authService.refreshToken().pipe(
            switchMap((res) => {
              const cloneReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.refreshToken}`,
                },
              });
              localStorage.setItem('token', res.jwt);
              localStorage.setItem('refresh-token', res.refreshToken);
              return next(cloneReq);
            }),

            catchError((err) => {
              _authService.logout();
              return throwError(err);
            })
          );
        } else {
          return throwError(err);
        }
      })
    );
  }
  return next(req);
};
