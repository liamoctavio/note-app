import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  registrationSuccess: boolean = false;
  errorMessage: string = '';



  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email, forbiddenEmailDomain(['forbidden.com', 'test.com'])]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validators: this.passwordsMatchValidator
    }
  );
  }

  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) { // No es necesario el operador `?.`
      const { name, email, password, confirmPassword } = this.registerForm.value;

      if (password === confirmPassword) {
        // Guardar el usuario en el localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        this.registrationSuccess = true;
        this.registerForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirigir al login después del registro
        }, 3000); // Esperar 3 segundos antes de redirigir
      } else {
        this.errorMessage = 'El correo electrónico ya está registrado';
        this.registrationSuccess = false;
        setTimeout(() => this.errorMessage = '', 3000); // Mensaje desaparece después de 3 segundos
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente';
      this.registrationSuccess = false;
      setTimeout(() => this.errorMessage = '', 3000); // Mensaje desaparece después de 3 segundos
      }
  }

}

// Validador personalizado para prohibir ciertos dominios de correo
export function forbiddenEmailDomain(forbiddenDomains: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) {
      return null; // Si el campo está vacío, no valida aún.
    }
    const domain = email.split('@')[1];
    if (forbiddenDomains.includes(domain)) {
      return { forbiddenEmailDomain: true };
    }
    return null; // El correo es válido.
  };
}
