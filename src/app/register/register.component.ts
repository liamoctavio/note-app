import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  registrationSuccess: boolean = false;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
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
      } else {
        alert('Las contraseñas no coinciden');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

}
