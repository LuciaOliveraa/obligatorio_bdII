# Sistema de Votación Electrónica 
## Trabajo Obligatorio - Base de Datos II 

Este proyecto consiste en el desarrollo de una aplicación web de votación electrónica. El sistema fue implementado con una arquitectura full stack compuesta por:

Frontend: desarrollado en React.js para una experiencia interactiva y dinámica.

Backend: construido con Flask (Python) para manejar la lógica de negocio y exposición de APIs REST.

Base de datos: relacional, modelada en MySQL, siguiendo una metodología mixta para el diseño del modelo entidad-relación (MER).

La combinación de estas tecnologías permitió construir un sistema escalable, organizado y de fácil mantenimiento, con una clara separación entre la capa de presentación, lógica y persistencia.

## Orden de ejecución de scripts
1. creacion_db_tablas_base
2. on_delete_entidades_base
3. relaciones_tablas
4. triggers (ahora no, tengo que corregirlos primero)
5. login_addition
6. inserciones (a partir del 0 en adelante, en orden)
7. modificaciones (a partir del 0 en adelante, en orden)

## Base de Datos
Para ejecutar: 
* Tener instalado MySQL y un entorno para realizar la conexión
* Realizar la conexión con los parámetros dados:
  * Host: mysql.reto_ucu.net
  * Port: 50006
  * User: ic_g4_admin
  * Password

## Backend

En esta sección se detalla todo lo relacionado con el backend de este proyecto.

Para ejecutar el backend, es necesario contar con:
  * Python
  * Flask: <code>pip install Flask</code>
  * MySQL Conector: <code>pip install mysql-connector-python</code>
  * Flask Cors: <code>pip install flask-cors</code>
  * Creación de un archivo .env con la password
Para ejecutar:
* Posicionarse sobre el directorio: "backend"
* Ejecutar: python main.py

## Frontend
En esta sección se detalla todo lo relacionado con el backend de este proyecto.

Para ejecutar el frontend es necesario: 
* Instalar node.js
* En caso de no contar con las tecnologías necesarias: npm install
Para ejecutar:
* Posicionarse sobre el directorio: "Front-React"
* Ejecutar: npm start 

