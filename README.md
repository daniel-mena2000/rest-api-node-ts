<p align="center">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" width="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" width="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="40"/>
<img src="data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UmVuZGVyPC90aXRsZT48cGF0aCBkPSJNMTguMjYzLjAwN2MtMy4xMjEtLjE0Ny01Ljc0NCAyLjEwOS02LjE5MiA1LjA4Mi0uMDE4LjEzOC0uMDQ1LjI3Mi0uMDY3LjQwNS0uNjk2IDMuNzAzLTMuOTM2IDYuNTA3LTcuODI3IDYuNTA3LTEuMzg4IDAtMi42OTEtLjM1Ni0zLjgyNS0uOTc5YS4yMDI0LjIwMjQgMCAwIDAtLjMwMi4xNzhWMjRIMTJ2LTguOTk5YzAtMS42NTYgMS4zMzgtMyAyLjk4Ny0zaDIuOTg4YzMuMzgyIDAgNi4xMDMtMi44MTcgNS45Ny02LjI0NC0uMTItMy4wODQtMi42MS01LjYwMy01LjY4Mi01Ljc1Ii8+PC9zdmc+" width="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg" width="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" width="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" width="40"/>

</p>

---

# Backend REST API en Node.js + TypeScript para gestionar productos

- CRUD de productos (GET, POST, PUT, PATCH, DELETE) en /api/products
- Validaciones con express-validator
- Persistencia con Sequelize (conector pg, orientado a PostgreSQL)
- Documentación de endpoints con Swagger en /docs
- Tests con Jest + Supertest

## Usa principalmente estas tecnologías y librerías:

- Node.js: runtime para ejecutar el backend.
- TypeScript: tipado estático para escribir código más seguro y mantenible.
- Express: framework para crear la API REST y definir rutas/middlewares.

## Base de datos y ORM:

- Este proyecto utiliza una base de datos PostgreSQL alojada en Render.
- PostgreSQL (pg): motor de base de datos relacional.
- Sequelize: ORM para mapear modelos y hacer operaciones CRUD sin SQL manual en la mayoría de casos.
- sequelize-typescript: integración de Sequelize con clases/decoradores de TypeScript.
- pg-hstore: dependencia auxiliar usada por Sequelize en ciertos tipos de serialización.

![Swagger](./assets/api-rest-swagger.png)
