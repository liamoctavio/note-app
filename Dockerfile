# Usar una imagen de Nginx como base
FROM nginx:alpine

# Copiar los archivos generados en la carpeta `dist` al directorio predeterminado de Nginx
COPY ./dist/notes-app/browser /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
