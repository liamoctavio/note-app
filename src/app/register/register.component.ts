import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

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
    if (this.registerForm?.valid) {  // Asegúrate de que el formulario no sea null
      const { name, email, password, confirmPassword } = this.registerForm.value;
      if (password === confirmPassword) {
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        alert('Registro exitoso');
      } else {
        alert('Las contraseñas no coinciden');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

}
