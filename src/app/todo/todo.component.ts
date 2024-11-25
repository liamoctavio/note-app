import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent  {
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error
  filter: 'all' | 'completed' | 'pending' = 'all'; // Opciones: 'all', 'completed', 'pending'
  taskContent: string = ''; // Contenido de la tarea
  tasks: { id: number, content: string, completed: boolean, editing: boolean }[] = []; // Lista de tareas
  
  constructor() {
    this.loadTasks();
  }

  // Cargar las tareas del usuario desde el localStorage
  loadTasks(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const tasks = JSON.parse(localStorage.getItem(currentUser + '_tasks') || '[]');
      this.tasks = tasks;
      if (this.tasks.length === 0) {
        this.successMessage = 'No hay tareas guardadas';
        setTimeout(() => this.successMessage = '', 3000); // Mensaje desaparece después de 3 segundos
      }
    }else {
      this.errorMessage = 'Por favor inicie sesión para cargar las tareas';
      setTimeout(() => this.errorMessage = '', 3000); // Mensaje desaparece después de 3 segundos
    }
  }

  // Agregar una nueva tarea
  addTask(): void {
    if (this.taskContent.trim()) {
      const newTask = { id: Date.now(), content: this.taskContent, completed: false, editing: false };
      this.tasks.push(newTask);
      this.taskContent = ''; // Limpiar el campo de texto después de agregar
      this.saveTasks(); // Guardar las tareas actualizadas
      this.successMessage = 'Tarea agregada exitosamente';
      setTimeout(() => this.successMessage = '', 3000); // Mensaje desaparece después de 3 segundos
  
    }else {
      this.errorMessage = 'El contenido de la tarea no puede estar vacío';
      setTimeout(() => this.errorMessage = '', 3000); // Mensaje desaparece después de 3 segundos
    }
  }

  // Eliminar una tarea
  removeTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks(); // Guardar las tareas actualizadas
    this.successMessage = 'Tarea eliminada exitosamente';
    setTimeout(() => this.successMessage = '', 3000); 
  }

  // Guardar las tareas del usuario en el localStorage
  saveTasks(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      localStorage.setItem(currentUser + '_tasks', JSON.stringify(this.tasks));
      this.successMessage = 'Tareas guardadas exitosamente';
      setTimeout(() => this.successMessage = '', 3000); // Mensaje desaparece después de 3 segundos
    } else {
      this.errorMessage = 'Por favor inicie sesión para guardar las tareas';
      setTimeout(() => this.errorMessage = '', 3000); // Mensaje desaparece después de 3 segundos
    }
  }

  toggleTaskCompletion(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks(); // Guardar el estado actualizado
      this.successMessage = task.completed ? 'Tarea marcada como completada' : 'Tarea marcada como pendiente';
      setTimeout(() => this.successMessage = '', 3000); // Mensaje desaparece después de 3 segundos
    }
  }

  // Método para editar una tarea
  editTask(taskId: number, newContent: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].content = newContent; // Actualizar contenido
      this.saveTasks(); // Guardar cambios en el localStorage
      this.successMessage = 'Tarea editada exitosamente';
      setTimeout(() => this.successMessage = '', 3000); // Mensaje desaparece después de 3 segundos
    }else {
      this.errorMessage = 'No se pudo encontrar la tarea para editar';
      setTimeout(() => this.errorMessage = '', 3000); // Mensaje desaparece después de 3 segundos
    }
  }

  //Filtrar tareas
  get filteredTasks() {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  

  


}
