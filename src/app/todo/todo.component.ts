import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent  {
  taskContent: string = ''; // Contenido de la tarea
  tasks: { id: number, content: string }[] = []; // Lista de tareas

  constructor() {
    this.loadTasks();
  }

  // Cargar las tareas del usuario desde el localStorage
  loadTasks(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const tasks = JSON.parse(localStorage.getItem(currentUser + '_tasks') || '[]');
      this.tasks = tasks;
    }
  }

  // Agregar una nueva tarea
  addTask(): void {
    if (this.taskContent.trim()) {
      const newTask = { id: Date.now(), content: this.taskContent };
      this.tasks.push(newTask);
      this.taskContent = ''; // Limpiar el campo de texto después de agregar
      this.saveTasks(); // Guardar las tareas actualizadas
    }
  }

  // Eliminar una tarea
  removeTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks(); // Guardar las tareas actualizadas
  }

  // Guardar las tareas del usuario en el localStorage
  saveTasks(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      localStorage.setItem(currentUser + '_tasks', JSON.stringify(this.tasks));
      alert('Tareas guardadas');
    } else {
      alert('Por favor inicie sesión para guardar las tareas');
    }
  }

  /*ngOnInit(): void {
    // Recuperar datos de usuario al iniciar
    const savedData = this.userService.getUserData('todoList');
    console.log('Datos guardados:', savedData);
  } */


}
