# API de Gestión de Productos

Este es un backend construido con **Node.js + TypeScript**, utilizando **Express, PostgreSQL y Sequelize**.
Incluye autenticación, validaciones, documentación con **Swagger** y pruebas automatizadas con **Jest**.

## Tecnologías Usadas

- **Node.js + TypeScript**
- **Express**
- **PostgreSQL + Sequelize**
- **Jest + Supertest** (Pruebas)
- **Swagger** (Documentación)
- **Docker + Docker Compose**

---

## **Requisitos Previos**

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **PostgreSQL** (v15 o superior)
- **Docker y Docker Compose** (Opcional, si quieres correr el proyecto en contenedores)

---

## **Configuración del Proyecto**

Instalacion dependencias

- npm install

**Crea un archivo .env en la raíz con esta configuración:**

- DB_HOST=localhost
- DB_USER=postgres
- DB_PASSWORD=123456
- DB_NAME=products_db
- DB_PORT=5432
- PORT=3000

## **Los siguientes pasos son en entorno local** ##

## Crea la base de datos

- npx ts-node src/config/initDatabase.ts

## Corre migraciones

- npx sequelize-cli db:migrate

## Corre el seeder (Opcional)

- npx sequelize-cli db:seed:all

Corre la API

- npm run dev

## **Correr pruebas unitarias**

- npx jest

## **Documentacion**

Una vez que el servidor está corriendo, puedes acceder a la documentación interactiva en:

 - http://localhost:3001/api-docs



## En caso de usar docker
**Crea un archivo .env en la raíz con esta configuración:**

- DB_HOST=postgres
- DB_USER=postgres
- DB_PASSWORD=123456
- DB_NAME=products_db
- DB_PORT=5432
- PORT=3002
- NODE_ENV=development


**Use docker-compose up --build**
Las migraciones y seeder se corren en automatico por medio del docker compose 