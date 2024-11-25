import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'notes-app';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.checkLoginStatus(); // Verificar si el usuario está autenticado
  }

  
}
