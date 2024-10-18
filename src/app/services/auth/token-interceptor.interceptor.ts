import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(LoginService);  // Inject AuthService in the interceptor

  const token = authService.getToken();  // Get JWT token from AuthService

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);  // Pass the cloned request with token
  }



  return next(req);
};
