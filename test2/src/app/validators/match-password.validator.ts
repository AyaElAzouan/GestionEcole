import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validateur personnalisé pour vérifier que les mots de passe correspondent
export function matchPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordKey);
    const confirmPassword = control.get(confirmPasswordKey);

    if (password?.pristine || confirmPassword?.pristine) {
      return null; // Ne pas valider si les champs sont vierges
    }

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordsMismatch: true }
      : null;
  };
}
