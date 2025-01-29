import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated() && authService.currentUserRole() === 'ADMIN') {
    return true;
  }
  
  router.navigate(['/landing']); // Redirige vers une page d'erreur ou de redirection
  return false;
};
