import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'; 
import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';





const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home', component: HomeComponent },// Página principal
  { path: 'login', component: LoginComponent },  
  { path: 'register', component: RegisterComponent },
  { path: 'todo', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
