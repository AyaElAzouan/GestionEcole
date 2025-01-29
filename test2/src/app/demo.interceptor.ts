import { HttpInterceptorFn } from '@angular/common/http';

export const demoInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('JwtToken') || 'null';

  // Clone the request and add the authorization header
  const authReq = req.clone({
    headers: req.headers.set ('Authorization',`Bearer ${authToken}`)
    
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
// demo.interceptor.ts



