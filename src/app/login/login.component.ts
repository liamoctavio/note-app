import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Importar el Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFailed = false; // Para mostrar un mensaje de error si las credenciales no son válidas

  constructor(
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  login(): void {
    if (this.loginForm.invalid) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const { email, password } = this.loginForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Verificar las credenciales
    const user = users.find((user: any) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('currentUser', email); // Guardar el usuario actual
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/todo']); // Redirigir a la página de tareas
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }
  
}
