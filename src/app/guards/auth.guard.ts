import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const checkUser = async () => {
    try{
      const data = await authService.verifySession();
      return true;
    }catch(err){
      router.navigate(['/sign-in']);
      return false;
    }
  }

  return checkUser();

};
