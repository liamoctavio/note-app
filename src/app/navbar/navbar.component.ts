import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService) {}

  ngOnInit(): void {
    /*const user = localStorage.getItem('user');  // Obtener el usuario desde el localStorage
    if (user) {
      this.isLoggedIn = true;  // Si el usuario existe en el localStorage, significa que está logueado
    }*/
    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.isLoggedIn = false;  // Actualizar el estado de sesión
    this.router.navigate(['/home']);  // Redirigir a la página de login
  }
  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);  // Redirigir a la página de login

  }

}
