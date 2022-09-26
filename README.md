## Desafío - Soluciones Digitales

### CONSIGNA

#### Tecnologías por utilizar

- Base de datos: MySQL, SQL o MongoDb.
- Backend: PHP o NodeJS.
- Frontend: JavaScript, React, HTML – CSS.

**Se valorará el uso de React, Nodejs y MongoDb.**

**Tarea a realizar**
Se requiere crear un listado de clientes con los siguientes datos:

- DNI
- Nombre
- Apellido
- Sexo
- Número de teléfono.

En base a dicho listado, desarrollar una web app que permita:

- Filtrar por número de documento.
- Al tener resultado de búsqueda, mostrar información en pantalla. En caso de no encontrarlo, mostrar un mensaje indicando que el cliente no se encuentra en la base de datos.
- Sumar un cliente nuevo a la base de datos.
- Editar los datos del cliente seleccionado.
- Borrar al cliente seleccionado de la base de datos posterior a mensaje de confirmación.

**Es necesario que el backend cuente con las siguientes funciones**

- Traer todos los clientes.
- Modificar los datos de un cliente en específico.
- Borrar a un cliente en específico.

**A tener en cuenta**

- El proyecto completo se debe subir a un repositorio de GIT.
- Subir la base de datos a la carpeta del proyecto.
- Crear un readme con instrucciones de la implementación del proyecto.
- Inspirarse en las imágenes adjuntas para diseñar la interfaz.

### RESOLUCION

#### Tecnologías utilizadas

- Base de datos: MongoDb.
- Backend: NodeJS.
- Librerías: express, mongoose, ejs, winston.
- Frontend: HTML, CSS, Javascript.

#### Inicio de apliacion

- Puerto de escucha: 8080 (predeterminado). Configurable en config.js (SERVER_PORT) o variable de entorno (PORT).
- URL MongoDB: mongodb://127.0.0.1/clients (predeterminada)-. Configurable en config.js o variable de entorno (MONGO_URL).
- npm run start (requiere servidor MongoBD o conexión a Mongo Atlas).
