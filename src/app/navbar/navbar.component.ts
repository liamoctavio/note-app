import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');  // Obtener el usuario desde el localStorage
    if (user) {
      this.isLoggedIn = true;  // Si el usuario existe en el localStorage, significa que está logueado
    }
  }

  logout(): void {
    this.isLoggedIn = false;  // Actualizar el estado de sesión
    this.router.navigate(['/home']);  // Redirigir a la página de login
  }

}
