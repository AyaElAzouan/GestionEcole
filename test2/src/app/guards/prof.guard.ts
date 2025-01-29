import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const profGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
    const router = inject(Router);
    
    if (authService.isAuthenticated() && authService.currentUserRole() === 'PROF') {
      return true;
    }
    
    router.navigate(['/landing']);
    return false;
};

