import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFailed = false; // Para mostrar un mensaje de error si las credenciales no son válidas
  username: string = ''; // Nombre de usuario
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  onLogin(): void {
    this.userService.login(this.username);
    this.userService.checkLoginStatus();
  }

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
    const user = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', email); // Guardar el usuario actual
      this.successMessage = 'Inicio de sesión exitoso';
      // this.router.navigate(['/todo']); // Redirigir a la página de tareas
      setTimeout(() => {
        this.router.navigate(['/todo']); // Redirigir a la página de tareas después de 5 segundos
      }, 1000);
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
  }

  onForgotPassword(): void {
    // Redirige a la página de recuperación de contraseña
    this.router.navigate(['/forgot-password']);
  }
}
