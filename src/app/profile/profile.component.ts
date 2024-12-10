import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isEditing: boolean = false; // Controla si el formulario está en modo edición
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // Recuperar datos del usuario actual desde el localStorage
    const currentUserEmail = localStorage.getItem('currentUser');
    if (currentUserEmail) {
      const user = this.userService.getUserData(currentUserEmail) || {};
      // Inicializar el formulario con los datos del usuario
      this.profileForm = this.fb.group({
        name: [{ value: user.name, disabled: true }, [Validators.required]],
        email: [
          { value: user.email, disabled: true },
          [Validators.required, Validators.email],
        ],
        password: [
          { value: '', disabled: true },
          [Validators.required, Validators.minLength(6)],
        ],
        confirmPassword: [{ value: '', disabled: true }, [Validators.required]],
      });
    }
  }

  // Método para habilitar los campos del formulario para su edición
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.get('name')?.enable();
      this.profileForm.get('email')?.enable();
      this.profileForm.get('password')?.enable();
      this.profileForm.get('confirmPassword')?.enable();
    } else {
      this.profileForm.get('name')?.disable();
      this.profileForm.get('email')?.disable();
      this.profileForm.get('password')?.disable();
      this.profileForm.get('confirmPassword')?.disable();
    }
  }

  // Método para guardar los cambios del usuario
  saveProfile(): void {
    if (this.profileForm.valid) {
      const { name, email, password, confirmPassword } = this.profileForm.value;

      if (password === confirmPassword) {
        // Actualizar la información del usuario
        this.userService.saveUserData('email', { name, email, password });
        this.successMessage = 'Perfil actualizado con éxito';
        // Bloquear los campos después de guardar
        this.toggleEdit(); // Deshabilitar el formulario después de guardar
      } else {
        this.errorMessage = 'Las contraseñas no coinciden';
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
