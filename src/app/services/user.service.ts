import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    this.checkLoginStatus();
  }

  // Verificar si el usuario está logeado
  checkLoginStatus(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.isLoggedInSubject.next(!!currentUser); // Actualiza el estado basado en la presencia del usuario
  }

  // Iniciar sesión
  login(username: string): void {
    localStorage.setItem('currentUser', username);
    this.isLoggedInSubject.next(true);
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
  }

  saveUserData(key: string, value: any): void {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!currentUser) {
      alert('No hay usuario logueado');
      return;
    }

    const userIndex = users.findIndex(
      (user: any) => user.email === currentUser
    ); // Cambia "username" a "email" si usas email

    if (userIndex !== -1) {
      // Actualiza los datos del usuario con el nuevo nombre, email y contraseña
      users[userIndex] = { ...users[userIndex], ...value };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', value.email); // Actualizar el email del usuario logueado
    }
  }

  // Obtener los datos del usuario
  getUserData(email: string): any {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((user: any) => user.email === email) || null;
  }
}
