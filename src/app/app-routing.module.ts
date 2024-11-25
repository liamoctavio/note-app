import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';  // Asegúrate de tener este componente



const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },  // Ruta para la página de login

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
