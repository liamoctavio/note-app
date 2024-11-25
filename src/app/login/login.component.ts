import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFailed = false; // Para mostrar un mensaje de error si las credenciales no son válidas

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      // Obtener el usuario almacenado en LocalStorage
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      // Validar las credenciales
      if (
        storedUser &&
        storedUser.email === formValue.email &&
        storedUser.password === formValue.password
      ) {
        console.log('Inicio de sesión exitoso');
        // Puedes redirigir al usuario a otra página
        this.loginFailed = false;
        // Aquí podrías guardar alguna variable en localStorage para indicar que el usuario está autenticado
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        console.log('Credenciales incorrectas');
        this.loginFailed = true; // Mostrar mensaje de error
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
