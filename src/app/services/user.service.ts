import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  saveUserData(key: string, value: any): void {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!currentUser) {
      alert('No hay usuario logueado');
      return;
    }

    const userIndex = users.findIndex((user: any) => user.email === currentUser); // Cambia "username" a "email" si usas email

    if (userIndex !== -1) {
      users[userIndex].data[key] = value; // Guardar datos específicos
      localStorage.setItem('users', JSON.stringify(users));
      alert('Datos guardados correctamente');
    }
  }

  getUserData(key: string): any {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!currentUser) {
      return null;
    }

    const user = users.find((user: any) => user.email === currentUser); // Cambia "username" a "email" si usas email

    return user ? user.data[key] : null;
  }
}
