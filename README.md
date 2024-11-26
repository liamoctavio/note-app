# Descripción del Proyecto
Este proyecto es una aplicación web de lista de tareas (To-Do List) que permite a los usuarios gestionar tareas de manera sencilla. La aplicación incluye un sistema de autenticación con opciones para iniciar sesión y registrarse, un menú de bienvenida, y funcionalidades para visualizar y modificar el perfil del usuario. Los usuarios pueden agregar, editar, eliminar y marcar tareas como completadas. También incluye pruebas unitarias para asegurar la correcta funcionalidad de varias partes de la aplicación.

## Tecnologías Utilizadas

### Frontend:
- **Angular (version 18)**
- **HTML, CSS, Bootstrap**
### Backend:
- **LocalStorage (para persistencia de datos en el navegador)**
### Pruebas Unitarias:
- **Jasmine**
- **Karma**

## Instalación
1. Clonar el repositorio
Para comenzar a trabajar con este proyecto, primero clona este repositorio:

Copiar código
```
git clone https://github.com/tu_usuario/to-do-list-app.git
```
2. Instalar las dependencias
Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

bash
Copiar código
```
cd to-do-list-app
npm install
```
3. Ejecutar la aplicación
Para ejecutar la aplicación en modo de desarrollo, usa el siguiente comando:

Copiar código
```
ng serve
```
La aplicación estará disponible en http://localhost:4200.

## Uso
Registro de usuario:
Si eres un usuario nuevo, dirígete a la página de registro, ingresa tu nombre, correo electrónico y una contraseña segura. Haz clic en "Registrar" para crear tu cuenta.

Iniciar sesión:
Después de registrarte, puedes iniciar sesión con tu correo electrónico y contraseña. El sistema verificará tus credenciales y te redirigirá al menú principal.

Agregar tareas:
En la pantalla principal, haz clic en "Agregar tarea", ingresa el título y descripción de la tarea, y luego haz clic en "Guardar".

Editar o eliminar tareas:
Puedes editar cualquier tarea haciendo clic en el icono de edición junto a ella, o eliminarla con el ícono de la papelera.

Marcar tarea como completada:
Puedes marcar una tarea como completada haciendo clic en la casilla junto a ella.

Ver y editar tu perfil:
Haz clic en "Mi perfil" para ver tu información personal y modificarla si es necesario.


